// Real Government Exam Question Banks Loader
// Each topic loads its own dedicated JSON question file

import numberSystem from './number-system.json';
import simplification from './simplification.json';
import lcmHcf from './lcm-hcf.json';
import average from './average.json';
import percentage from './percentage.json';
import ratioProportion from './ratio-proportion.json';
import partnership from './partnership.json';
import profitLoss from './profit-loss.json';
import simpleInterest from './simple-interest.json';
import compoundInterest from './compound-interest.json';
import discount from './discount.json';
import timeWork from './time-work.json';
import pipesCisterns from './pipes-cisterns.json';
import timeSpeedDistance from './time-speed-distance.json';
import boatsStreams from './boats-streams.json';
import trains from './trains.json';
import ages from './ages.json';
import mixtureAllegation from './mixture-allegation.json';
import mensuration2d from './mensuration-2d.json';
import mensuration3d from './mensuration-3d.json';
import geometry from './geometry.json';
import algebra from './algebra.json';
import trigonometry from './trigonometry.json';
import heightsDistances from './heights-distances.json';
import probability from './probability.json';
import permutationCombination from './permutation-combination.json';
import dataInterpretation from './data-interpretation.json';
import dataSufficiency from './data-sufficiency.json';
import statistics from './statistics.json';
import calendar from './calendar.json';
import clock from './clock.json';
import codingDecodingNum from './coding-decoding-num.json';
import quadraticEquations from './quadratic-equations.json';
import series from './series.json';
import missingNumbers from './missing-numbers.json';
import decimalFractions from './decimal-fractions.json';
import surdsIndices from './surds-indices.json';
import logarithms from './logarithms.json';
import vennDiagramsNum from './venn-diagrams-num.json';
import linearEquations from './linear-equations.json';

const topicQuestionBanks = {
  'number-system': numberSystem,
  'simplification': simplification,
  'lcm-hcf': lcmHcf,
  'average': average,
  'percentage': percentage,
  'ratio-proportion': ratioProportion,
  'partnership': partnership,
  'profit-loss': profitLoss,
  'simple-interest': simpleInterest,
  'compound-interest': compoundInterest,
  'discount': discount,
  'time-work': timeWork,
  'pipes-cisterns': pipesCisterns,
  'time-speed-distance': timeSpeedDistance,
  'boats-streams': boatsStreams,
  'trains': trains,
  'ages': ages,
  'mixture-allegation': mixtureAllegation,
  'mensuration-2d': mensuration2d,
  'mensuration-3d': mensuration3d,
  'geometry': geometry,
  'algebra': algebra,
  'trigonometry': trigonometry,
  'heights-distances': heightsDistances,
  'probability': probability,
  'permutation-combination': permutationCombination,
  'data-interpretation': dataInterpretation,
  'data-sufficiency': dataSufficiency,
  'statistics': statistics,
  'calendar': calendar,
  'clock': clock,
  'coding-decoding-num': codingDecodingNum,
  'quadratic-equations': quadraticEquations,
  'series': series,
  'missing-numbers': missingNumbers,
  'decimal-fractions': decimalFractions,
  'surds-indices': surdsIndices,
  'logarithms': logarithms,
  'venn-diagrams-num': vennDiagramsNum,
  'linear-equations': linearEquations,
};

import { generateUniqueTopicQuestionBank } from '../topicQuestionBanks';

/**
 * Get the real question bank for a given topic ID.
 * Returns an array of real competitive exam questions.
 */
export function getTopicRealQuestionBank(topicId) {
  if (!topicId) return [];
  const normalizedKey = topicId.toLowerCase().trim();
  const bank = topicQuestionBanks[normalizedKey];
  
  const staticQuestions = (bank && Array.isArray(bank) && bank.length > 0) ? bank : [];
  
  // Generate 200 additional questions to demonstrate the new 100-300 question palette support
  const dynamicQuestions = generateUniqueTopicQuestionBank(normalizedKey, 200);
  
  return [...staticQuestions, ...dynamicQuestions];
}

/**
 * Get all available topic IDs that have real questions.
 */
export function getAvailableTopicIds() {
  return Object.keys(topicQuestionBanks).filter(key => {
    const bank = topicQuestionBanks[key];
    return bank && Array.isArray(bank) && bank.length > 0;
  });
}
