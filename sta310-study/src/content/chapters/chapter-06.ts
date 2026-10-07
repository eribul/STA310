import type { Chapter } from '../types'

/**
 * Chapter 6 - Flexible parametric models (Collett, 4th ed.).
 * Piecewise exponential models, splines and the Royston-Parmar model for the
 * log-cumulative hazard, plus flexible proportional odds models.
 */
export const chapter06: Chapter = {
  number: 6,
  slug: 'flexible-parametric-models',
  title: 'Flexible parametric models',
  summary:
    'Piecewise exponential hazards, spline basis functions, the Royston-Parmar model for the log-cumulative hazard, and flexible proportional odds models.',
  bookSections: '§6.1-6.5',
  flashcards: [
    {
      id: 'ch06-f01',
      front: 'Define the piecewise exponential model.',
      back: 'The baseline hazard is constant within each interval between cut points (knots): h_0(t) = lambda_j for t_(j-1) <= t < t_(j), with lambda_j > 0. Equivalently lambda_j = exp(phi_j). It fits an exponential model in each interval and can be fitted by maximum likelihood.',
      source: '§6.1',
    },
    {
      id: 'ch06-f02',
      front: 'How many intervals should a piecewise exponential model use, and where should the cut points go?',
      back: 'Usually no more than about 10 intervals; a separate parameter for every event time over-parameterises the model and causes numerical and standard-error problems. A common choice puts cut points at intervals containing similar numbers of events, with narrower intervals where the hazard changes quickly.',
      source: '§6.1',
    },
    {
      id: 'ch06-f03',
      front: 'What is a spline function and what are knots?',
      back: 'A spline divides the time scale into intervals and fits a polynomial within each interval, constraining the pieces to join smoothly at the interval boundaries (the knots). Cubic splines (degree 3) are generally used as a compromise between flexibility and stability.',
      source: '§6.2',
    },
    {
      id: 'ch06-f04',
      front: 'How many basis functions does a B-spline of degree k with m internal knots have?',
      back: 'm + k + 1 basis functions. For a cubic B-spline (k = 3) there are therefore m + 4 basis functions, and the spline is a linear combination of them with coefficients estimated in the fitting process. The knot sequence is augmented by repeating the boundary knots to define the recurrence.',
      source: '§6.2.1',
    },
    {
      id: 'ch06-f05',
      front: 'What is a restricted cubic spline and why is it used?',
      back: 'A cubic spline that is constrained to be linear beyond the boundary knots. This prevents the wild extrapolation that ordinary splines can produce at the shortest and longest event times, which makes it well suited to modelling survival functions.',
      source: '§6.2.2',
    },
    {
      id: 'ch06-f06',
      front: 'State the Royston-Parmar model for the log-cumulative hazard.',
      back: 'log H_i(t) = eta_i + gamma_0 + gamma_1 y + sum_{j=1}^{m} gamma_{j+1} nu_j(y), where y = log t, eta_i = beta\'x_i and the nu_j(y) are restricted cubic spline basis functions with m internal knots. Proportional hazards still holds among the covariates.',
      source: '§6.4',
    },
    {
      id: 'ch06-f07',
      front: 'What model does the Royston-Parmar model reduce to when there are no internal knots?',
      back: 'A Weibull model: log H_i(t) = eta_i + gamma_0 + gamma_1 log t is linear in y = log t, exactly the Weibull log-cumulative hazard with gamma_0 = log lambda and gamma_1 = gamma. With zero knots the survivor function is exp[-exp{eta_i + gamma_0 + gamma_1 y}].',
      source: '§6.4',
    },
    {
      id: 'ch06-f08',
      front: 'Why model the log-cumulative hazard (or survivor) rather than the hazard itself?',
      back: 'Spline models for the hazard can behave strangely near the shortest and longest event times. Modelling log H_0(t) is more stable, and the survivor function follows immediately as S_i(t) = exp{-H_i(t)}, so survival probabilities are easy to obtain.',
      source: '§6.4',
    },
    {
      id: 'ch06-f09',
      front: 'How is the number of knots chosen in a Royston-Parmar model?',
      back: 'Fit models with increasing numbers of internal knots and pick the one with the smallest AIC or BIC. Covariate selection can first be based on a standard Weibull or Cox model, because the number of knots is barely affected by covariate adjustment.',
      source: '§6.4',
    },
    {
      id: 'ch06-f10',
      front: 'Describe the flexible proportional odds model.',
      back: 'log[ S_i(t) / {1 - S_i(t)} ] = eta_i + gamma_0 + gamma_1 y + sum gamma_{j+1} nu_j(y), i.e. a restricted cubic spline model for the log-odds of survival beyond t. With zero knots it reduces to the standard proportional odds (log-logistic) model, and it is particularly suited to unimodal hazards.',
      source: '§6.5',
    },
    {
      id: 'ch06-f11',
      front: 'Why can the AIC of a Cox model not be compared with the AIC of a piecewise exponential model?',
      back: 'The Cox AIC is built from a maximised partial likelihood, whereas the piecewise exponential AIC uses the full likelihood. The two statistics are based on different likelihoods, so they are not on a comparable scale.',
      source: '§6.1',
    },
  ],
  questions: [
    {
      id: 'ch06-q01',
      prompt: 'What does the piecewise exponential model assume about the baseline hazard?',
      options: [
        'It is a smooth cubic function of time.',
        'It is constant within each interval between cut points, and a separate exponential model is fitted in each interval.',
        'It is identical to the Cox baseline hazard at every event time.',
        'It is a straight line through the origin.',
      ],
      correctIndex: 1,
      explanation:
        'The baseline hazard h_0(t) = lambda_j is piecewise constant on intervals defined by the cut points (knots), so each interval has its own exponential hazard. Too many intervals over-parameterise the model.',
      source: '§6.1',
    },
    {
      id: 'ch06-q02',
      prompt: 'What distinguishes a restricted cubic spline from an ordinary cubic spline?',
      options: [
        'It uses only linear terms.',
        'It is constrained to be linear beyond the boundary knots.',
        'It has no internal knots.',
        'It cannot be used with maximum likelihood.',
      ],
      correctIndex: 1,
      explanation:
        'A restricted cubic spline is linear outside the boundary knots. This limits unusual behaviour and extrapolation at the extreme survival times, which is why it is the standard choice for flexible survival models.',
      source: '§6.2.2',
    },
    {
      id: 'ch06-q03',
      prompt:
        'A Royston-Parmar model for the log-cumulative hazard is fitted with zero internal knots. Which model is this equivalent to?',
      options: ['Exponential', 'Weibull', 'Log-logistic', 'Gompertz'],
      correctIndex: 1,
      explanation:
        'With no internal knots, log H_0(t) = gamma_0 + gamma_1 log t, which is the Weibull log-cumulative hazard. The exponential is the special case gamma_1 = 1.',
      source: '§6.4',
    },
    {
      id: 'ch06-q04',
      prompt:
        'A cubic B-spline is fitted with 3 internal knots. How many basis functions are used?',
      options: ['3', '4', '7', '10'],
      correctIndex: 2,
      explanation:
        'A B-spline of degree k with m internal knots has m + k + 1 basis functions. For a cubic spline k = 3 and m = 3, giving 3 + 3 + 1 = 7 basis functions.',
      source: '§6.2.1',
    },
    {
      id: 'ch06-q05',
      prompt: 'Which flexible model would you prefer when the hazard function appears unimodal?',
      options: [
        'A flexible proportional hazards model with a spline baseline hazard.',
        'A flexible proportional odds model with a spline baseline survivor function.',
        'An exponential model.',
        'A piecewise exponential model with two intervals.',
      ],
      correctIndex: 1,
      explanation:
        'The flexible proportional odds model (with a log-logistic zero-knot form) is particularly suited to unimodal hazards, because the log-logistic hazard has a single mode when kappa > 1.',
      source: '§6.5',
    },
    {
      id: 'ch06-q06',
      prompt: 'How is the number of internal knots in a flexible parametric model usually chosen?',
      options: [
        'By always using the maximum number the software allows.',
        'By fitting models with different numbers of knots and comparing AIC or BIC.',
        'By a formal test of gamma_0 = 0.',
        'By counting the number of uncensored observations.',
      ],
      correctIndex: 1,
      explanation:
        'Models with increasing numbers of internal knots are compared using AIC or BIC, and the model with the smallest value is preferred. AIC values can behave a little erratically when models are barely distinguishable.',
      source: '§6.4',
    },
  ],
}
