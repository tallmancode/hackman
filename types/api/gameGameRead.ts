/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * Hackman Api
 * Hackman Api
 * OpenAPI spec version: 1.0.0
 */
import type { GameGameReadEndDateTime } from './gameGameReadEndDateTime';
import type { GameLevelGameRead } from './gameLevelGameRead';

export interface GameGameRead {
  startDateTime?: string;
  endDateTime?: GameGameReadEndDateTime;
  hash?: string;
  gameLevels?: GameLevelGameRead[];
  lives?: number;
}
