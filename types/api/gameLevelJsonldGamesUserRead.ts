/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * Hackman Api
 * Hackman Api
 * OpenAPI spec version: 1.0.0
 */
import type { GameLevelJsonldGamesUserReadContext } from './gameLevelJsonldGamesUserReadContext';
import type { WordJsonldGamesUserRead } from './wordJsonldGamesUserRead';

export interface GameLevelJsonldGamesUserRead {
  readonly '@context'?: GameLevelJsonldGamesUserReadContext;
  readonly '@id'?: string;
  readonly '@type'?: string;
  word?: WordJsonldGamesUserRead;
}
