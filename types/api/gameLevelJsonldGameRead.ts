/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * Hackman Api
 * Hackman Api
 * OpenAPI spec version: 1.0.0
 */
import type { GameLevelJsonldGameReadContext } from './gameLevelJsonldGameReadContext';
import type { WordJsonldGameRead } from './wordJsonldGameRead';

export interface GameLevelJsonldGameRead {
  readonly '@context'?: GameLevelJsonldGameReadContext;
  readonly '@id'?: string;
  readonly '@type'?: string;
  word?: WordJsonldGameRead;
}
