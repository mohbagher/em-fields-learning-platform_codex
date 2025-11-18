/**
 * Simplified spatial multiplexing throughput estimate.
 */
export function mimoThroughputbps(
  numStreams: number,
  bandwidthHz: number,
  snrDb: number
): number {
  const snrLinear = Math.pow(10, snrDb / 10);
  return numStreams * bandwidthHz * Math.log2(1 + snrLinear / Math.max(numStreams, 1));
}

/**
 * mmWave path loss with an added absorption term.
 */
export function mmWavePathLossDb(distanceMeters: number, frequencyGhz: number): number {
  if (distanceMeters <= 0 || frequencyGhz <= 0) return 0;
  const frequencyMhz = frequencyGhz * 1000;
  const distanceKm = distanceMeters / 1000;
  const fspl = 20 * Math.log10(distanceKm) + 20 * Math.log10(frequencyMhz) + 32.44;
  const absorption = 0.5 * distanceKm; // coarse oxygen absorption penalty
  return fspl + absorption;
}

/**
 * Radar range equation (monostatic) returning received power in dBW.
 */
export function radarReceivedPowerDbw(
  txPowerDbw: number,
  antennaGainLinear: number,
  wavelengthMeters: number,
  rcsSquareMeters: number,
  rangeMeters: number
): number {
  if (rangeMeters <= 0 || wavelengthMeters <= 0) return -Infinity;
  const numerator =
    txPowerDbw +
    10 * Math.log10(antennaGainLinear * antennaGainLinear * wavelengthMeters * wavelengthMeters * rcsSquareMeters);
  const denominator = 10 * Math.log10(Math.pow(4 * Math.PI, 3) * Math.pow(rangeMeters, 4));
  return numerator - denominator;
}

/**
 * Optical link budget adding individual losses (dB) to transmitter power (dBm).
 */
export function opticalLinkBudgetDbm(txPowerDbm: number, lossesDb: number[]): number {
  return lossesDb.reduce((acc, loss) => acc - loss, txPowerDbm);
}

/**
 * Phased array coherent beamforming gain: G = N (linear) => 10 log10(N).
 */
export function beamformingGainDb(numElements: number): number {
  if (numElements <= 0) return 0;
  return 10 * Math.log10(numElements);
}
