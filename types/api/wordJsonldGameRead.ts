/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * Hackman Api
 * Hackman Api
 * OpenAPI spec version: 1.0.0
 */
import type { WordJsonldGameReadContext } from './wordJsonldGameReadContext';
import type { WordJsonldGameReadIv } from './wordJsonldGameReadIv';

export interface WordJsonldGameRead {
  readonly '@context'?: WordJsonldGameReadContext;
  readonly '@id'?: string;
  readonly '@type'?: string;
  readonly id?: number;
  word?: string;
  level?: number;
  hint?: string;
  iv?: WordJsonldGameReadIv;
}
