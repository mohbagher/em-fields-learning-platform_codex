/**
 * Signal-to-noise ratio in dB from signal and noise powers.
 */
export function snrDb(signalPower: number, noisePower: number): number {
  if (noisePower <= 0) return 0;
  return 10 * Math.log10(signalPower / noisePower);
}

/**
 * Shannon capacity: C = B log2(1 + SNR).
 */
export function shannonCapacity(bandwidthHz: number, snrDbValue: number): number {
  const snrLinear = Math.pow(10, snrDbValue / 10);
  return bandwidthHz * Math.log2(1 + snrLinear);
}

/**
 * Energy-per-bit to noise ratio conversion.
 */
export function ebNoDb(snrDbValue: number, bandwidthHz: number, dataRateBps: number): number {
  if (dataRateBps <= 0) return 0;
  const snrLinear = Math.pow(10, snrDbValue / 10);
  const ebNoLinear = snrLinear * (bandwidthHz / dataRateBps);
  return 10 * Math.log10(ebNoLinear);
}

/**
 * Bit error rate for BPSK in AWGN.
 */
export function berBpsk(snrDbValue: number): number {
  const snrLinear = Math.pow(10, snrDbValue / 10);
  return 0.5 * erfc(Math.sqrt(snrLinear));
}

/**
 * Simple link budget summation (dB domain).
 */
export function linkBudgetDb(startPowerDbm: number, deltasDb: number[]): number {
  return deltasDb.reduce((acc, delta) => acc + delta, startPowerDbm);
}

// Complementary error function approximation for BER calculations
function erfc(x: number): number {
  const z = Math.abs(x);
  const t = 1 / (1 + 0.5 * z);
  const ans =
    t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * 0.09678418)));
  return x >= 0 ? ans : 2 - ans;
}
