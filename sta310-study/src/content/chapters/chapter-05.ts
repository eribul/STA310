import type { Chapter } from '../types'

/**
 * Chapter 5 - Parametric regression models (Collett, 4th ed.).
 * Exponential, Weibull, log-logistic, lognormal and Gompertz models, how to
 * check them, the accelerated failure time model and the proportional odds model.
 */
export const chapter05: Chapter = {
  number: 5,
  slug: 'parametric-models',
  title: 'Parametric regression models',
  summary:
    'Fully parametric models for the hazard (exponential, Weibull, log-logistic, lognormal, Gompertz), graphical checks, the accelerated failure time model and the proportional odds model.',
  bookSections: '§5.1-5.15',
  flashcards: [
    {
      id: 'ch05-f01',
      front: 'Give the hazard and survivor functions of the exponential distribution.',
      back: 'h(t) = lambda (constant); S(t) = exp(-lambda t); median = (log 2)/lambda; mean = 1/lambda. The exponential model assumes the hazard does not change with time.',
      source: '§5.1.1',
    },
    {
      id: 'ch05-f02',
      front: 'Give the hazard and survivor functions of the Weibull distribution and the role of each parameter.',
      back: 'h(t) = lambda * gamma * t^(gamma-1); S(t) = exp(-lambda t^gamma). lambda is the scale parameter and gamma the shape parameter: gamma = 1 gives the exponential, and for other gamma the hazard increases or decreases monotonically.',
      source: '§5.1.2',
    },
    {
      id: 'ch05-f03',
      front: 'Give the survivor function of the log-logistic distribution and describe its hazard.',
      back: 'S(t) = 1 / (1 + e^theta t^kappa). The hazard decreases monotonically if kappa <= 1, and has a single mode if kappa > 1. The log-odds of survival beyond t is linear in log t, giving the proportional odds property.',
      source: '§5.1.3',
    },
    {
      id: 'ch05-f04',
      front: 'How is the lognormal distribution defined and what does its hazard look like?',
      back: 'log T has a normal distribution with mean mu and variance sigma^2, so S(t) = 1 - Phi((log t - mu)/sigma) and the median is exp(mu). The hazard starts at 0, rises to a maximum, then decreases towards 0. Because S and h involve the normal integral, the model is less convenient than log-logistic, to which it is very similar.',
      source: '§5.1.4',
    },
    {
      id: 'ch05-f05',
      front: 'Give the hazard function of the Gompertz distribution and contrast it with Weibull.',
      back: 'h(t) = lambda e^(theta t), so log h(t) = alpha + theta t is linear in t, whereas the Weibull log-hazard is linear in log t. theta = 0 gives the exponential; theta > 0 gives an increasing hazard. Both models give monotone hazards.',
      source: '§5.1.5',
    },
    {
      id: 'ch05-f06',
      front: 'Explain how a log-cumulative hazard plot assesses a Weibull assumption and yields rough estimates.',
      back: 'For a Weibull, log{-log S(t)} = log lambda + gamma log t. Plotting log{-log S-hat(t)} against log t should give a straight line if Weibull is appropriate; the slope estimates the shape gamma and e^(intercept) estimates the scale lambda. A slope near 1 suggests the exponential model.',
      source: '§5.2',
    },
    {
      id: 'ch05-f07',
      front: 'How would you check the suitability of a log-logistic model graphically?',
      back: 'Plot the estimated log-odds of survival beyond t against log t. A straight line supports the log-logistic model, with intercept and slope giving estimates of the parameters. If Weibull also looks straight, either model may do; the more convenient one is chosen.',
      source: '§5.2',
    },
    {
      id: 'ch05-f08',
      front: 'How is the lognormal assumption checked?',
      back: 'Plot Phi^{-1}{1 - S-hat(t)} against log t; a straight line supports the lognormal model. The slope estimates 1/sigma and the intercept estimates -mu/sigma.',
      source: '§5.2',
    },
    {
      id: 'ch05-f09',
      front: 'State the accelerated failure time (AFT) model and define the time ratio.',
      back: 'S_N(t) = S_S(t/phi): covariates act multiplicatively on the time scale. phi is the time ratio, so the median (and every percentile) of the new treatment is phi times that of the standard. The acceleration factor is phi^-1.',
      source: '§5.10',
    },
    {
      id: 'ch05-f10',
      front: 'How do covariates enter the general AFT model?',
      back: 'h_i(t) = exp(-alpha\'x_i) h_0(t * exp(-alpha\'x_i)), i.e. covariates speed up or slow down patient time. For a Weibull AFT model, alpha\'x_i = -beta\'x_i (up to scale), so the Weibull PH and AFT forms are equivalent.',
      source: '§5.11-5.12',
    },
    {
      id: 'ch05-f11',
      front: 'How do you interpret the coefficients of a Weibull proportional hazards model?',
      back: 'h_i(t) = exp(beta\'x_i) * lambda gamma t^(gamma-1). The beta coefficients are log-hazard ratios, exactly as in the Cox model, but the Weibull model also gives a smooth baseline hazard.',
      source: '§5.6',
    },
    {
      id: 'ch05-f12',
      front: 'How do you choose between a Cox and a Weibull proportional hazards model?',
      back: 'Compare the standard errors of the estimated coefficients. If the Weibull standard errors are substantially smaller, prefer Weibull on grounds of efficiency; if they are similar, prefer Cox because its assumptions are less restrictive. Diagnostics rarely separate the two convincingly.',
      source: '§5.9',
    },
    {
      id: 'ch05-f13',
      front: 'Define the proportional odds model.',
      back: 'The odds of surviving beyond t are S_i(t)/{1 - S_i(t)} = exp(beta\'x_i) * S_0(t)/{1 - S_0(t)}, so covariates act multiplicatively on the odds of survival and the log-odds ratio is beta\'x_i. The log-logistic distribution is the fully parametric version.',
      source: '§5.15',
    },
    {
      id: 'ch05-f14',
      front: 'What is a distinctive property of the proportional odds hazard ratio h_i(t)/h_0(t)?',
      back: 'It converges from e^(-eta_i) at t = 0 to 1 as t tends to infinity. So the covariates matter most near the time origin, and hazard ratios that move towards 1 over time are natural under this model.',
      source: '§5.15',
    },
  ],
  questions: [
    {
      id: 'ch05-q01',
      prompt:
        'A log-cumulative hazard plot for a single sample is approximately a straight line with slope 1.2 and intercept -5.5. What does this imply?',
      options: [
        'The exponential model is exact, because the slope is not 1.',
        'A Weibull model is plausible, with shape about 1.2 and scale about exp(-5.5).',
        'The lognormal model is the only suitable model.',
        'The proportional hazards assumption is violated.',
      ],
      correctIndex: 1,
      explanation:
        'A straight log-cumulative hazard plot supports the Weibull model; the slope estimates the shape gamma (about 1.2) and exp(intercept) estimates the scale lambda. A slope close to 1 would suggest the exponential model.',
      source: '§5.2',
    },
    {
      id: 'ch05-q02',
      prompt:
        'Under an accelerated failure time model, what is the interpretation of the time ratio phi?',
      options: [
        'The hazard ratio between the two groups.',
        'The median survival time of the new treatment is phi times that of the standard treatment.',
        'The probability of surviving beyond time t.',
        'The shape parameter of the Weibull distribution.',
      ],
      correctIndex: 1,
      explanation:
        'In the AFT model S_N(t) = S_S(t/phi), so every percentile of the survival distribution is multiplied by phi, including the median. The hazard ratio interpretation belongs to the proportional hazards model.',
      source: '§5.10',
    },
    {
      id: 'ch05-q03',
      prompt: 'Which distribution has a hazard whose logarithm is linear in time t?',
      options: ['Weibull', 'Gompertz', 'Log-logistic', 'Exponential'],
      correctIndex: 1,
      explanation:
        'The Gompertz hazard is h(t) = lambda e^(theta t), so log h(t) is linear in t. The Weibull log-hazard lambda gamma t^(gamma-1) is linear in log t instead.',
      source: '§5.1.5',
    },
    {
      id: 'ch05-q04',
      prompt:
        'Which parametric model is the natural fully parametric counterpart of the proportional odds model?',
      options: ['Weibull', 'Exponential', 'Log-logistic', 'Gompertz'],
      correctIndex: 2,
      explanation:
        'The log-logistic survivor function gives log-odds of survival that are linear in log t, which is exactly the proportional odds structure. The Weibull underlies proportional hazards, not proportional odds.',
      source: '§5.15.1',
    },
    {
      id: 'ch05-q05',
      prompt:
        'A Cox model and a Weibull proportional hazards model give nearly identical coefficient estimates, but the Weibull standard errors are much smaller. Which model should be preferred, and why?',
      options: [
        'Cox, because it makes fewer assumptions.',
        'Weibull, because its smaller standard errors imply greater efficiency when the distributional assumption is reasonable.',
        'Neither; the models cannot be compared.',
        'Cox, because the Weibull standard errors are biased.',
      ],
      correctIndex: 1,
      explanation:
        'When there is little difference in fit, the model with substantially smaller standard errors is preferred on efficiency grounds. If the standard errors were similar, the Cox model would be preferred for its less restrictive assumptions.',
      source: '§5.9',
    },
    {
      id: 'ch05-q06',
      prompt:
        'A Weibull model is fitted with shape parameter gamma = 0.6. What does this say about the hazard?',
      options: [
        'The hazard is constant over time.',
        'The hazard decreases monotonically with time.',
        'The hazard increases monotonically with time.',
        'The hazard first rises and then falls.',
      ],
      correctIndex: 1,
      explanation:
        'The Weibull hazard lambda gamma t^(gamma-1) is monotone; with gamma < 1 the exponent is negative, so the hazard decreases over time. gamma = 1 gives a constant hazard and gamma > 1 an increasing hazard.',
      source: '§5.1.2',
    },
  ],
}
