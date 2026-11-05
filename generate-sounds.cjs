const fs = require('fs');
const path = require('path');

const SAMPLE_RATE = 44100;
const outputDir = path.join(__dirname, 'public', 'sounds');

function createWavBuffer(samples) {
  const buffer = Buffer.alloc(44 + samples.length * 2);
  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + samples.length * 2, 4);
  buffer.write('WAVE', 8);
  // fmt chunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(1, 22); // mono
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(SAMPLE_RATE * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  // data chunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(samples.length * 2, 40);
  for (let i = 0; i < samples.length; i++) {
    const val = Math.max(-1, Math.min(1, samples[i]));
    buffer.writeInt16LE(Math.round(val * 32767), 44 + i * 2);
  }
  return buffer;
}

function generateTone(freq, duration, volume = 0.5, fadeOut = true) {
  const numSamples = Math.round(SAMPLE_RATE * duration);
  const samples = new Float64Array(numSamples);
  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    let envelope = volume;
    if (fadeOut) {
      envelope *= 1 - (i / numSamples);
    }
    samples[i] = Math.sin(2 * Math.PI * freq * t) * envelope;
  }
  return samples;
}

function concatSamples(...arrays) {
  const total = arrays.reduce((s, a) => s + a.length, 0);
  const result = new Float64Array(total);
  let offset = 0;
  for (const arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}

function generateSweep(startFreq, endFreq, duration, volume = 0.5) {
  const numSamples = Math.round(SAMPLE_RATE * duration);
  const samples = new Float64Array(numSamples);
  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const progress = i / numSamples;
    const freq = startFreq + (endFreq - startFreq) * progress;
    const envelope = volume * (1 - progress * 0.5);
    samples[i] = Math.sin(2 * Math.PI * freq * t) * envelope;
  }
  return samples;
}

// Generate all sounds
const sounds = {
  'click.wav': generateTone(800, 0.05, 0.4),
  'countdown.wav': generateTone(600, 0.1, 0.5),
  'shoot.wav': generateSweep(400, 1200, 0.2, 0.6),
  'win-round.wav': concatSamples(
    generateTone(523, 0.1, 0.5),
    generateTone(659, 0.1, 0.5),
    generateTone(784, 0.15, 0.5)
  ),
  'lose-round.wav': concatSamples(
    generateTone(400, 0.1, 0.4),
    generateTone(300, 0.1, 0.4),
    generateTone(200, 0.15, 0.4)
  ),
  'draw.wav': generateTone(440, 0.2, 0.4),
  'victory.wav': concatSamples(
    generateTone(523, 0.12, 0.6),
    generateTone(659, 0.12, 0.6),
    generateTone(784, 0.12, 0.6),
    generateTone(1047, 0.25, 0.6)
  ),
};

// Defeat: "wah wah" with vibrato
const defeatSamples = (() => {
  const freqs = [440, 370, 311, 261];
  const parts = freqs.map((f, idx) => {
    const dur = 0.15;
    const numSamples = Math.round(SAMPLE_RATE * dur);
    const samples = new Float64Array(numSamples);
    for (let i = 0; i < numSamples; i++) {
      const t = i / SAMPLE_RATE;
      const vibrato = Math.sin(2 * Math.PI * 6 * t) * 15;
      const envelope = 0.5 * (1 - (i / numSamples) * 0.3);
      samples[i] = Math.sin(2 * Math.PI * (f + vibrato) * t) * envelope;
    }
    return samples;
  });
  return concatSamples(...parts);
})();
sounds['defeat.wav'] = defeatSamples;

// BGM: simple beat pattern
const bgmSamples = (() => {
  const duration = 2;
  const numSamples = Math.round(SAMPLE_RATE * duration);
  const samples = new Float64Array(numSamples);
  const bpm = 120;
  const beatInterval = 60 / bpm;
  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const beatPos = t % beatInterval;
    const beatNum = Math.floor(t / beatInterval);
    const freq = beatNum % 2 === 0 ? 200 : 250;
    if (beatPos < 0.08) {
      const env = 0.3 * (1 - beatPos / 0.08);
      samples[i] = Math.sin(2 * Math.PI * freq * t) * env;
    }
  }
  return samples;
})();
sounds['bgm.wav'] = bgmSamples;

// Write all files
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

for (const [filename, samples] of Object.entries(sounds)) {
  const buffer = createWavBuffer(samples);
  fs.writeFileSync(path.join(outputDir, filename), buffer);
  console.log(`Created: ${filename} (${buffer.length} bytes)`);
}

console.log('\nAll sound files generated successfully!');
