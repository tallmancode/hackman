/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * Hackman Api
 * Hackman Api
 * OpenAPI spec version: 1.0.0
 */
import type { WordJsonldGamesUserReadContext } from './wordJsonldGamesUserReadContext';
import type { WordJsonldGamesUserReadIv } from './wordJsonldGamesUserReadIv';

export interface WordJsonldGamesUserRead {
  readonly '@context'?: WordJsonldGamesUserReadContext;
  readonly '@id'?: string;
  readonly '@type'?: string;
  readonly id?: number;
  word?: string;
  level?: number;
  hint?: string;
  iv?: WordJsonldGamesUserReadIv;
}
