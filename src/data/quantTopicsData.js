// Complete 40-Topic Quantitative Aptitude Government Exam Syllabus Data

export const quantTopicsList = [
  {
    id: 'number-system',
    name: 'Number System',
    questionsCount: 850,
    difficulty: 'Easy',
    pyqCount: 220,
    progress: 45,
    accuracy: 82,
    avgTime: '45s',
    bookmarked: false,
    summary: 'Divisibility rules, remainders, unit digit, factors, prime numbers, and rational/irrational numbers.',
    formulas: [
      'Sum of first n natural numbers = n(n + 1) / 2',
      'Sum of squares of first n natural numbers = n(n + 1)(2n + 1) / 6',
      'Sum of cubes of first n natural numbers = [n(n + 1) / 2]^2',
      'Dividend = (Divisor × Quotient) + Remainder'
    ],
    tricks: [
      'Divisibility by 3 & 9: Sum of digits must be divisible by 3 or 9.',
      'Divisibility by 11: Difference of sum of odd and even placed digits must be 0 or multiple of 11.',
      'Unit digit of cyclicity 4: 2, 3, 7, 8 repeat unit digit every 4th power.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-number-system',
    pdfUrl: '/notes/number-system.pdf'
  },
  {
    id: 'simplification',
    name: 'Simplification',
    questionsCount: 920,
    difficulty: 'Easy',
    pyqCount: 310,
    progress: 70,
    accuracy: 88,
    avgTime: '35s',
    bookmarked: true,
    summary: 'VBODMAS rule, fraction operations, powers, indices, and algebraic approximations.',
    formulas: [
      'VBODMAS: Vinculum -> Brackets -> Of -> Division -> Multiplication -> Addition -> Subtraction',
      '(a + b)^2 = a^2 + 2ab + b^2',
      '(a - b)^2 = a^2 - 2ab + b^2',
      'a^2 - b^2 = (a - b)(a + b)'
    ],
    tricks: [
      'Use approximation when options have large gaps.',
      'Convert mixed fractions into improper fractions before division.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-simplification',
    pdfUrl: '/notes/simplification.pdf'
  },
  {
    id: 'lcm-hcf',
    name: 'LCM & HCF',
    questionsCount: 450,
    difficulty: 'Easy',
    pyqCount: 140,
    progress: 60,
    accuracy: 80,
    avgTime: '50s',
    bookmarked: false,
    summary: 'Prime factorization, division method, bell ringing intervals, and fraction LCM/HCF.',
    formulas: [
      'Product of two numbers = LCM × HCF',
      'LCM of Fractions = (LCM of Numerators) / (HCF of Denominators)',
      'HCF of Fractions = (HCF of Numerators) / (LCM of Denominators)'
    ],
    tricks: [
      'For traffic lights or bells ringing together, find the LCM of individual intervals.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-lcm-hcf',
    pdfUrl: '/notes/lcm-hcf.pdf'
  },
  {
    id: 'average',
    name: 'Average',
    questionsCount: 600,
    difficulty: 'Medium',
    pyqCount: 180,
    progress: 50,
    accuracy: 75,
    avgTime: '1m 05s',
    bookmarked: false,
    summary: 'Weighted average, age inclusions/exclusions, batsman batting average, and speed averages.',
    formulas: [
      'Average = Sum of all observations / Total number of observations',
      'Average Speed = 2xy / (x + y) for equal distances at speeds x and y',
      'New Average = Old Average ± (Deviation / New Total Count)'
    ],
    tricks: [
      'Assumed mean deviation method reduces heavy calculations for large datasets.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-average',
    pdfUrl: '/notes/average.pdf'
  },
  {
    id: 'percentage',
    name: 'Percentage',
    questionsCount: 1000,
    difficulty: 'Easy',
    pyqCount: 350,
    progress: 85,
    accuracy: 91,
    avgTime: '40s',
    bookmarked: true,
    summary: 'Fraction-to-percentage conversion, successive percentage change, population growth, and election problems.',
    formulas: [
      'Percentage = (Value / Total) × 100',
      'Percentage Increase = (Increase / Original) × 100',
      'Net Change = A + B + (AB / 100)% for successive changes A% and B%'
    ],
    tricks: [
      'Memorize fraction equivalents: 1/6 = 16.66%, 1/7 = 14.28%, 1/8 = 12.5%, 1/9 = 11.11%.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-percentage',
    pdfUrl: '/notes/percentage.pdf'
  },
  {
    id: 'ratio-proportion',
    name: 'Ratio & Proportion',
    questionsCount: 780,
    difficulty: 'Medium',
    pyqCount: 240,
    progress: 65,
    accuracy: 84,
    avgTime: '55s',
    bookmarked: false,
    summary: 'Compounded ratio, duplicate ratio, mean proportional, third/fourth proportional, and coin problems.',
    formulas: [
      'If a/b = c/d, then Mean Proportional between a & b is √(ab)',
      'Fourth Proportional to a, b, c is (b × c) / a',
      'Componendo and Dividendo: If a/b = c/d then (a+b)/(a-b) = (c+d)/(c-d)'
    ],
    tricks: [
      'Combine A:B = 2:3 and B:C = 4:5 into A:B:C = 8:12:15 by making B common.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-ratio',
    pdfUrl: '/notes/ratio-proportion.pdf'
  },
  {
    id: 'partnership',
    name: 'Partnership',
    questionsCount: 380,
    difficulty: 'Easy',
    pyqCount: 110,
    progress: 40,
    accuracy: 79,
    avgTime: '1m 00s',
    bookmarked: false,
    summary: 'Simple & compound partnership, active vs sleeping partner, and time-weighted profit sharing.',
    formulas: [
      'Profit Ratio = (Investment_A × Time_A) : (Investment_B × Time_B)',
      'Working Partner Salary is deducted from Total Profit before distribution'
    ],
    tricks: [
      'Always multiply capital by months invested before setting up the simplified ratio.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-partnership',
    pdfUrl: '/notes/partnership.pdf'
  },
  {
    id: 'profit-loss',
    name: 'Profit & Loss',
    questionsCount: 950,
    difficulty: 'Medium',
    pyqCount: 300,
    progress: 75,
    accuracy: 86,
    avgTime: '50s',
    bookmarked: true,
    summary: 'Cost Price, Selling Price, Marked Price, Dishonest Dealer tricks, and Buy X Get Y Free offers.',
    formulas: [
      'Profit % = (Profit / CP) × 100',
      'Loss % = (Loss / CP) × 100',
      'SP = CP × (100 ± Profit/Loss %) / 100',
      'Marked Price (MP) = SP / (1 - Discount % / 100)'
    ],
    tricks: [
      'Dishonest dealer profit % = [ Error / (True Value - Error) ] × 100.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-profit-loss',
    pdfUrl: '/notes/profit-loss.pdf'
  },
  {
    id: 'simple-interest',
    name: 'Simple Interest',
    questionsCount: 520,
    difficulty: 'Easy',
    pyqCount: 160,
    progress: 80,
    accuracy: 92,
    avgTime: '40s',
    bookmarked: false,
    summary: 'Principal, rate of interest per annum, time period, and amount doubling/tripling formulas.',
    formulas: [
      'SI = (P × R × T) / 100',
      'Amount A = P + SI = P [ 1 + (R × T) / 100 ]',
      'Time to double money at R% = 100 / R years'
    ],
    tricks: [
      'If money becomes N times in T years, R% = 100(N - 1) / T.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-si',
    pdfUrl: '/notes/simple-interest.pdf'
  },
  {
    id: 'compound-interest',
    name: 'Compound Interest',
    questionsCount: 680,
    difficulty: 'Hard',
    pyqCount: 210,
    progress: 55,
    accuracy: 72,
    avgTime: '1m 20s',
    bookmarked: true,
    summary: 'Annual, semi-annual, quarterly compounding, difference between CI & SI, and installment payments.',
    formulas: [
      'Amount A = P [ 1 + R/100 ]^T',
      'Difference (CI - SI) for 2 years = P (R / 100)^2',
      'Difference (CI - SI) for 3 years = P (R / 100)^2 × [ (300 + R) / 100 ]'
    ],
    tricks: [
      'Use Pascal triangle ratio (2:1 for 2 yrs, 3:3:1 for 3 yrs) for fast interest calculation.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-ci',
    pdfUrl: '/notes/compound-interest.pdf'
  },
  {
    id: 'discount',
    name: 'Discount',
    questionsCount: 420,
    difficulty: 'Medium',
    pyqCount: 130,
    progress: 60,
    accuracy: 81,
    avgTime: '45s',
    bookmarked: false,
    summary: 'Trade discount, cash discount, successive discounts, and single equivalent discount.',
    formulas: [
      'Single Equivalent Discount for D1 and D2 = [ D1 + D2 - (D1 × D2)/100 ] %',
      'Discount Amount = Marked Price - Selling Price'
    ],
    tricks: [
      'Buy 3 Get 1 Free is equivalent to Discount % = (1 / 4) × 100 = 25%.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-discount',
    pdfUrl: '/notes/discount.pdf'
  },
  {
    id: 'time-work',
    name: 'Time & Work',
    questionsCount: 880,
    difficulty: 'Medium',
    pyqCount: 290,
    progress: 72,
    accuracy: 85,
    avgTime: '1m 10s',
    bookmarked: true,
    summary: 'Work efficiency ratios, group work (men/women/children), alternate day work, and wages division.',
    formulas: [
      'Work = Efficiency × Time',
      'M1 × D1 × H1 / W1 = M2 × D2 × H2 / W2',
      'Wages are distributed strictly in the ratio of work done or daily efficiency'
    ],
    tricks: [
      'Assign LCM of individual days as total work units to avoid working with fractions.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-time-work',
    pdfUrl: '/notes/time-work.pdf'
  },
  {
    id: 'pipes-cisterns',
    name: 'Pipes & Cisterns',
    questionsCount: 410,
    difficulty: 'Medium',
    pyqCount: 125,
    progress: 58,
    accuracy: 83,
    avgTime: '1m 05s',
    bookmarked: false,
    summary: 'Inlet pipes, outlet/leak pipes, net filling rate, and alternate pipe operation.',
    formulas: [
      'Inlet 1 hour work = +1/A, Outlet 1 hour work = -1/B',
      'Net rate = (1/A - 1/B) when both are open'
    ],
    tricks: [
      'Treat leak as a pipe with negative efficiency in LCM method.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-pipes',
    pdfUrl: '/notes/pipes-cisterns.pdf'
  },
  {
    id: 'time-speed-distance',
    name: 'Time, Speed & Distance',
    questionsCount: 910,
    difficulty: 'Hard',
    pyqCount: 280,
    progress: 64,
    accuracy: 76,
    avgTime: '1m 15s',
    bookmarked: true,
    summary: 'Relative speed, average speed, unit conversions (km/h to m/s), and meeting point problems.',
    formulas: [
      'Distance = Speed × Time',
      '1 km/h = 5/18 m/s',
      '1 m/s = 18/5 km/h',
      'Relative speed (Same Direction) = S1 - S2, (Opposite Direction) = S1 + S2'
    ],
    tricks: [
      'If time is constant, Distance ratio = Speed ratio.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-tsd',
    pdfUrl: '/notes/time-speed-distance.pdf'
  },
  {
    id: 'boats-streams',
    name: 'Boats & Streams',
    questionsCount: 360,
    difficulty: 'Medium',
    pyqCount: 115,
    progress: 52,
    accuracy: 80,
    avgTime: '1m 00s',
    bookmarked: false,
    summary: 'Downstream speed, upstream speed, speed of boat in still water, and current speed.',
    formulas: [
      'Downstream Speed (D) = Speed of Boat (u) + Speed of Current (v)',
      'Upstream Speed (U) = Speed of Boat (u) - Speed of Current (v)',
      'Speed of Boat in Still Water u = (D + U) / 2',
      'Speed of Stream v = (D - U) / 2'
    ],
    tricks: [
      'Always express u and v in km/h or m/s before solving equations.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-boats',
    pdfUrl: '/notes/boats-streams.pdf'
  },
  {
    id: 'trains',
    name: 'Trains',
    questionsCount: 540,
    difficulty: 'Medium',
    pyqCount: 175,
    progress: 68,
    accuracy: 84,
    avgTime: '55s',
    bookmarked: false,
    summary: 'Crossing stationary pole/man, crossing platform/bridge, and two moving trains crossing each other.',
    formulas: [
      'Time to cross pole = Length of Train / Speed',
      'Time to cross platform = (Length of Train + Length of Platform) / Speed',
      'Time to cross moving train = (L1 + L2) / Relative Speed'
    ],
    tricks: [
      'Convert speed to m/s immediately if train lengths are given in meters.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-trains',
    pdfUrl: '/notes/trains.pdf'
  },
  {
    id: 'ages',
    name: 'Ages',
    questionsCount: 480,
    difficulty: 'Easy',
    pyqCount: 150,
    progress: 82,
    accuracy: 90,
    avgTime: '45s',
    bookmarked: false,
    summary: 'Present age ratios, age n years ago, age n years hence, and father-son age equations.',
    formulas: [
      'Age difference between two persons remains constant throughout their lifetime',
      'Ratio method: If age ratio changes from a:b to c:d after t years, balance cross-differences'
    ],
    tricks: [
      'Plug in options directly for fast verification in age word problems.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-ages',
    pdfUrl: '/notes/ages.pdf'
  },
  {
    id: 'mixture-allegation',
    name: 'Mixture & Allegation',
    questionsCount: 430,
    difficulty: 'Hard',
    pyqCount: 135,
    progress: 48,
    accuracy: 74,
    avgTime: '1m 20s',
    bookmarked: true,
    summary: 'Rule of allegation, milk-water replacement, multi-liquid mixing, and cost price mixtures.',
    formulas: [
      'Quantity of Cheaper / Quantity of Dearer = (Dearer Price - Mean Price) / (Mean Price - Cheaper Price)',
      'Final Pure Liquid Remaining = Initial × (1 - Replacement / Total)^n'
    ],
    tricks: [
      'Cross subtraction in Allegation rule yields the exact ratio of quantities mixed.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-allegation',
    pdfUrl: '/notes/mixture-allegation.pdf'
  },
  {
    id: 'mensuration-2d',
    name: 'Mensuration 2D',
    questionsCount: 720,
    difficulty: 'Medium',
    pyqCount: 230,
    progress: 70,
    accuracy: 82,
    avgTime: '1m 00s',
    bookmarked: false,
    summary: 'Area and perimeter of triangles, quadrilaterals, circles, sectors, and pathways.',
    formulas: [
      'Area of Triangle = 1/2 × Base × Height or √[s(s-a)(s-b)(s-c)] (Heron\'s)',
      'Area of Circle = π r^2, Circumference = 2 π r',
      'Area of Sector = (θ / 360) × π r^2',
      'Area of Trapezium = 1/2 × (Sum of Parallel Sides) × Height'
    ],
    tricks: [
      'Pythagorean triplets (3-4-5, 5-12-13, 7-24-25, 8-15-17) speed up right triangle geometry.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-mensuration-2d',
    pdfUrl: '/notes/mensuration-2d.pdf'
  },
  {
    id: 'mensuration-3d',
    name: 'Mensuration 3D',
    questionsCount: 650,
    difficulty: 'Hard',
    pyqCount: 200,
    progress: 54,
    accuracy: 75,
    avgTime: '1m 25s',
    bookmarked: true,
    summary: 'Volume, Curved Surface Area (CSA), and Total Surface Area (TSA) of cube, cuboid, cylinder, cone, sphere, and frustum.',
    formulas: [
      'Volume of Cylinder = π r^2 h, CSA = 2 π r h, TSA = 2 π r (h + r)',
      'Volume of Cone = 1/3 π r^2 h, Slant Height l = √(r^2 + h^2)',
      'Volume of Sphere = 4/3 π r^3, Surface Area = 4 π r^2',
      'Volume of Hemisphere = 2/3 π r^3, TSA = 3 π r^2'
    ],
    tricks: [
      'When 3D shapes are melted and recast, total volume remains constant.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-mensuration-3d',
    pdfUrl: '/notes/mensuration-3d.pdf'
  },
  {
    id: 'geometry',
    name: 'Geometry',
    questionsCount: 810,
    difficulty: 'Hard',
    pyqCount: 260,
    progress: 42,
    accuracy: 68,
    avgTime: '1m 30s',
    bookmarked: true,
    summary: 'Lines, angles, triangle congruence/similarity, circles, chords, tangents, and cyclic quadrilaterals.',
    formulas: [
      'Sum of interior angles of n-sided polygon = (n - 2) × 180°',
      'Inradius of Right Triangle r = (a + b - c) / 2',
      'Circumradius of Right Triangle R = c / 2',
      'Alternate Segment Theorem for circles and tangents'
    ],
    tricks: [
      'Assign easy angle values (e.g., 60° for equilateral) to prove unknown geometric angles.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-geometry',
    pdfUrl: '/notes/geometry.pdf'
  },
  {
    id: 'algebra',
    name: 'Algebra',
    questionsCount: 790,
    difficulty: 'Medium',
    pyqCount: 250,
    progress: 62,
    accuracy: 80,
    avgTime: '1m 00s',
    bookmarked: false,
    summary: 'Algebraic identities, polynomial factorization, roots, symmetric functions, and maximum/minimum values.',
    formulas: [
      'If a + b + c = 0, then a^3 + b^3 + c^3 = 3abc',
      'a^3 + b^3 = (a + b)(a^2 - ab + b^2)',
      'a^3 - b^3 = (a - b)(a^2 + ab + b^2)',
      'x + 1/x = k => x^2 + 1/x^2 = k^2 - 2'
    ],
    tricks: [
      'Value substitution method: Put a=1, b=1, c=0 to simplify long symmetric algebraic identities.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-algebra',
    pdfUrl: '/notes/algebra.pdf'
  },
  {
    id: 'trigonometry',
    name: 'Trigonometry',
    questionsCount: 630,
    difficulty: 'Hard',
    pyqCount: 195,
    progress: 49,
    accuracy: 71,
    avgTime: '1m 15s',
    bookmarked: true,
    summary: 'Radian measure, trigonometric ratios, standard values (0° to 90°), complementary angles, and identities.',
    formulas: [
      'sin^2 θ + cos^2 θ = 1',
      '1 + tan^2 θ = sec^2 θ',
      '1 + cot^2 θ = cosec^2 θ',
      'sin(90° - θ) = cos θ, tan(90° - θ) = cot θ'
    ],
    tricks: [
      'Put θ = 45° or θ = 0°/90° to eliminate trigonometric expressions in seconds.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-trig',
    pdfUrl: '/notes/trigonometry.pdf'
  },
  {
    id: 'heights-distances',
    name: 'Heights & Distances',
    questionsCount: 390,
    difficulty: 'Medium',
    pyqCount: 120,
    progress: 66,
    accuracy: 84,
    avgTime: '55s',
    bookmarked: false,
    summary: 'Angle of elevation, angle of depression, tower shadows, and multi-observer distance problems.',
    formulas: [
      'In 30°-60°-90° triangle, ratio of sides = 1 : √3 : 2',
      'In 45°-45°-90° triangle, ratio of sides = 1 : 1 : √2',
      'tan θ = Opposite / Adjacent'
    ],
    tricks: [
      'Use 1:√3:2 standard side ratio for instant mental calculation without tan formula.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-heights',
    pdfUrl: '/notes/heights-distances.pdf'
  },
  {
    id: 'probability',
    name: 'Probability',
    questionsCount: 510,
    difficulty: 'Medium',
    pyqCount: 155,
    progress: 58,
    accuracy: 78,
    avgTime: '1m 05s',
    bookmarked: true,
    summary: 'Coins, dice, cards (52-deck), marbles, independent events, and conditional probability.',
    formulas: [
      'Probability P(E) = Number of Favorable Outcomes / Total Sample Space Outcomes',
      'P(A ∪ B) = P(A) + P(B) - P(A ∩ B)',
      '0 ≤ P(E) ≤ 1, P(E) + P(E\') = 1'
    ],
    tricks: [
      'For "at least one" problems, compute 1 - P(none).'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-probability',
    pdfUrl: '/notes/probability.pdf'
  },
  {
    id: 'permutation-combination',
    name: 'Permutation & Combination',
    questionsCount: 470,
    difficulty: 'Hard',
    pyqCount: 145,
    progress: 46,
    accuracy: 70,
    avgTime: '1m 20s',
    bookmarked: true,
    summary: 'Factorials, arrangement of letters/people, circular permutations, selection of committees, and handshakes.',
    formulas: [
      'nPr = n! / (n - r)!',
      'nCr = n! / [ r! (n - r)! ]',
      'Circular Permutation of n distinct items = (n - 1)!',
      'Number of handshakes among n people = nC2 = n(n - 1) / 2'
    ],
    tricks: [
      'Treat items that must stay together as 1 single block.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-pnc',
    pdfUrl: '/notes/permutation-combination.pdf'
  },
  {
    id: 'data-interpretation',
    name: 'Data Interpretation',
    questionsCount: 1000,
    difficulty: 'Medium',
    pyqCount: 380,
    progress: 78,
    accuracy: 87,
    avgTime: '1m 10s',
    bookmarked: false,
    summary: 'Bar charts, pie charts, line graphs, tabular DI, caselet DI, and radar charts.',
    formulas: [
      'Percentage Growth = [ (Final - Initial) / Initial ] × 100',
      'Pie Chart Angle = (Component Value / Total Value) × 360°'
    ],
    tricks: [
      'Master fast division approximations to solve 5-question DI sets rapidly.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-di',
    pdfUrl: '/notes/data-interpretation.pdf'
  },
  {
    id: 'data-sufficiency',
    name: 'Data Sufficiency',
    questionsCount: 340,
    difficulty: 'Hard',
    pyqCount: 105,
    progress: 41,
    accuracy: 72,
    avgTime: '1m 15s',
    bookmarked: false,
    summary: 'Evaluating Statement 1 alone, Statement 2 alone, both together, or insufficient data.',
    formulas: [
      'Option A: Statement 1 alone is sufficient',
      'Option B: Statement 2 alone is sufficient',
      'Option C: Both statements together are required',
      'Option D: Neither statement is sufficient'
    ],
    tricks: [
      'Do NOT compute final numerical answer—only check if unique value can be determined.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-ds',
    pdfUrl: '/notes/data-sufficiency.pdf'
  },
  {
    id: 'statistics',
    name: 'Statistics',
    questionsCount: 380,
    difficulty: 'Easy',
    pyqCount: 110,
    progress: 75,
    accuracy: 88,
    avgTime: '45s',
    bookmarked: false,
    summary: 'Mean, median, mode, range, standard deviation, variance, and coefficient of variation.',
    formulas: [
      'Mode = 3 × Median - 2 × Mean (Empirical relation)',
      'Variance = (Standard Deviation)^2',
      'Coefficient of Variation = (Std Dev / Mean) × 100'
    ],
    tricks: [
      'Sort observations in ascending order first to find Median.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-statistics',
    pdfUrl: '/notes/statistics.pdf'
  },
  {
    id: 'calendar',
    name: 'Calendar',
    questionsCount: 310,
    difficulty: 'Easy',
    pyqCount: 95,
    progress: 88,
    accuracy: 94,
    avgTime: '35s',
    bookmarked: false,
    summary: 'Odd days calculation, leap years, century leap years, and finding day of any given date.',
    formulas: [
      'Ordinary year has 1 odd day (365 = 52 weeks + 1 day)',
      'Leap year has 2 odd days (366 = 52 weeks + 2 days)',
      '100 years have 5 odd days, 400 years have 0 odd days'
    ],
    tricks: [
      'Calendar repeats every 28 years for leap years, 11 years for regular years.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-calendar',
    pdfUrl: '/notes/calendar.pdf'
  },
  {
    id: 'clock',
    name: 'Clock',
    questionsCount: 290,
    difficulty: 'Medium',
    pyqCount: 90,
    progress: 70,
    accuracy: 86,
    avgTime: '45s',
    bookmarked: false,
    summary: 'Angle between hour and minute hands, coincidence, right angles, straight lines, and slow/fast clocks.',
    formulas: [
      'Angle θ = | 30H - (11/2)M |',
      'Minute hand speed = 6°/min, Hour hand speed = 0.5°/min',
      'Relative speed = 5.5°/min'
    ],
    tricks: [
      'Hands coincide every 65 (5/11) minutes.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-clock',
    pdfUrl: '/notes/clock.pdf'
  },
  {
    id: 'coding-decoding-num',
    name: 'Coding & Decoding (Numerical)',
    questionsCount: 460,
    difficulty: 'Easy',
    pyqCount: 140,
    progress: 84,
    accuracy: 92,
    avgTime: '30s',
    bookmarked: false,
    summary: 'Letter-number substitution, positional values (A=1 to Z=26), reverse values, and operator coding.',
    formulas: [
      'EJOTY formula: E=5, J=10, O=15, T=20, Y=25',
      'Reverse Alphabet Rank = 27 - Forward Rank'
    ],
    tricks: [
      'Write down forward and reverse ranks (A-Z and Z-A) on scratch sheet at start of exam.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-coding-num',
    pdfUrl: '/notes/coding-decoding.pdf'
  },
  {
    id: 'quadratic-equations',
    name: 'Quadratic Equations',
    questionsCount: 580,
    difficulty: 'Medium',
    pyqCount: 180,
    progress: 72,
    accuracy: 86,
    avgTime: '50s',
    bookmarked: false,
    summary: 'Ax^2 + Bx + C = 0, discriminant, nature of roots, sum/product of roots, and sign comparison for banking.',
    formulas: [
      'Roots x = [ -B ± √(B^2 - 4AC) ] / (2A)',
      'Sum of roots α + β = -B/A',
      'Product of roots α × β = C/A',
      'Discriminant D = B^2 - 4AC'
    ],
    tricks: [
      'Sign rule trick: (+,+) -> (-,-), (-,+) -> (+,+), (+,-) -> (-,+), (-,-) -> (+,-).'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-quadratic',
    pdfUrl: '/notes/quadratic-equations.pdf'
  },
  {
    id: 'series',
    name: 'Series',
    questionsCount: 750,
    difficulty: 'Medium',
    pyqCount: 230,
    progress: 68,
    accuracy: 81,
    avgTime: '45s',
    bookmarked: false,
    summary: 'Number series, double difference series, multiplication+addition series, and wrong number series.',
    formulas: [
      'n-th term of AP = a + (n - 1)d',
      'n-th term of GP = a × r^(n - 1)'
    ],
    tricks: [
      'Check difference of differences if standard pattern is not obvious.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-series',
    pdfUrl: '/notes/series.pdf'
  },
  {
    id: 'missing-numbers',
    name: 'Missing Numbers',
    questionsCount: 510,
    difficulty: 'Medium',
    pyqCount: 160,
    progress: 62,
    accuracy: 79,
    avgTime: '45s',
    bookmarked: false,
    summary: 'Matrix grid missing numbers, circle/triangle pattern puzzles, and logic sequences.',
    formulas: [
      'Row-wise or Column-wise operations: (A + B)^2, A × B ± C, etc.'
    ],
    tricks: [
      'Look for largest number in row/column to identify output of smaller numbers.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-missing',
    pdfUrl: '/notes/missing-numbers.pdf'
  },
  {
    id: 'decimal-fractions',
    name: 'Decimal & Fractions',
    questionsCount: 360,
    difficulty: 'Easy',
    pyqCount: 110,
    progress: 85,
    accuracy: 93,
    avgTime: '30s',
    bookmarked: false,
    summary: 'Recurring decimals to fractions, ascending/descending fraction sorting, and decimal operations.',
    formulas: [
      '0.ā = a / 9',
      '0.ab̄ = (ab - a) / 90',
      'Cross Multiplication method to compare fractions: a/b vs c/d -> compare (a×d) vs (b×c)'
    ],
    tricks: [
      'Cross multiply numerators and denominators to compare fractions without calculating decimals.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-decimal',
    pdfUrl: '/notes/decimal-fractions.pdf'
  },
  {
    id: 'surds-indices',
    name: 'Surds & Indices',
    questionsCount: 440,
    difficulty: 'Medium',
    pyqCount: 135,
    progress: 64,
    accuracy: 83,
    avgTime: '45s',
    bookmarked: false,
    summary: 'Laws of indices, rationalizing the denominator, nested square roots, and comparing surds.',
    formulas: [
      'a^m × a^n = a^(m + n)',
      'a^m / a^n = a^(m - n)',
      '(a^m)^n = a^(m × n)',
      'a^0 = 1, a^(-m) = 1 / a^m'
    ],
    tricks: [
      'To compare 2^(1/2) and 3^(1/3), raise both to power of LCM(2,3) = 6.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-surds',
    pdfUrl: '/notes/surds-indices.pdf'
  },
  {
    id: 'logarithms',
    name: 'Logarithms',
    questionsCount: 250,
    difficulty: 'Medium',
    pyqCount: 75,
    progress: 55,
    accuracy: 80,
    avgTime: '50s',
    bookmarked: false,
    summary: 'Log definitions, product/quotient/power rules, base change theorem, and characteristic/mantissa.',
    formulas: [
      'log_b (m × n) = log_b m + log_b n',
      'log_b (m / n) = log_b m - log_b n',
      'log_b (m^k) = k × log_b m',
      'log_b a = (log_c a) / (log_c b)'
    ],
    tricks: [
      'Remember log10(2) ≈ 0.3010 and log10(3) ≈ 0.4771 for fast estimation.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-logarithms',
    pdfUrl: '/notes/logarithms.pdf'
  },
  {
    id: 'venn-diagrams-num',
    name: 'Venn Diagrams',
    questionsCount: 420,
    difficulty: 'Easy',
    pyqCount: 130,
    progress: 78,
    accuracy: 89,
    avgTime: '40s',
    bookmarked: false,
    summary: 'Two-set and three-set overlap diagrams, enrollment problems, and survey statistics.',
    formulas: [
      'n(A ∪ B) = n(A) + n(B) - n(A ∩ B)',
      'n(A ∪ B ∪ C) = n(A) + n(B) + n(C) - n(A∩B) - n(B∩C) - n(C∩A) + n(A∩B∩C)'
    ],
    tricks: [
      'Fill innermost triple intersection region first when solving 3-circle Venn problems.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-venn',
    pdfUrl: '/notes/venn-diagrams.pdf'
  },
  {
    id: 'linear-equations',
    name: 'Linear Equations',
    questionsCount: 490,
    difficulty: 'Easy',
    pyqCount: 145,
    progress: 82,
    accuracy: 91,
    avgTime: '35s',
    bookmarked: false,
    summary: 'One variable, two variable simultaneous equations, substitution method, and elimination method.',
    formulas: [
      'System a1 x + b1 y = c1 and a2 x + b2 y = c2:',
      'Unique Solution: a1/a2 ≠ b1/b2',
      'Infinite Solutions: a1/a2 = b1/b2 = c1/c2',
      'No Solution: a1/a2 = b1/b2 ≠ c1/c2'
    ],
    tricks: [
      'Eliminate one variable by scaling equations to matching coefficients.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=sample-linear',
    pdfUrl: '/notes/linear-equations.pdf'
  }
];
