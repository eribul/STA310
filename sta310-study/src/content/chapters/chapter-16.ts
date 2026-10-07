import type { Chapter } from '../types'

/**
 * Chapter 16 - Bayesian survival analysis (Collett, 4th ed.).
 * Bayes' theorem, priors, posterior summaries, simulation with MCMC, predictive
 * distributions and Bayesian model comparison.
 */
export const chapter16: Chapter = {
  number: 16,
  slug: 'bayesian-survival',
  title: 'Bayesian survival analysis',
  summary:
    'Combining prior information with the likelihood: prior distributions, credible intervals and hypothesis tests, MCMC simulation, and Bayesian model comparison with Bayes factors, DIC and WAIC.',
  bookSections: '§16.1-16.9',
  flashcards: [
    {
      id: 'ch16-f01',
      front: 'Write Bayes\' theorem for a continuous parameter and identify the components.',
      back: 'pi(theta | t) = L(t | theta) pi(theta) / p(t), where pi(theta) is the prior density of the unknown parameter, L(t | theta) is the likelihood of the observed data, pi(theta | t) is the posterior density, and p(t) is the marginal distribution of the data acting as a normalising constant. In words: posterior is proportional to likelihood times prior.',
      source: '§16.2',
    },
    {
      id: 'ch16-f02',
      front: 'What is a non-informative prior, and what happens to the posterior when one is used?',
      back: 'A prior that assigns similar probability density to all possible values of a parameter and has a large variance, used to represent lack of prior knowledge. The posterior is then dominated by the likelihood, so the inferences are driven almost entirely by the data. For a parameter on the whole real line a constant (uniform) density is used, which is improper but usually harmless.',
      source: '§16.4.1',
    },
    {
      id: 'ch16-f03',
      front: 'Distinguish vague (weakly informative) from informative priors.',
      back: 'A vague prior is a proper but highly dispersed distribution, such as a normal with a very large variance, so it is swamped by the data. An informative prior conveys substantial external knowledge, for example from earlier studies or expert opinion, and the posterior may then depend heavily on it.',
      source: '§16.4.2, §16.4.3',
    },
    {
      id: 'ch16-f04',
      front: 'Why can using a flat prior to represent ignorance be criticised?',
      back: 'A flat prior on (0, infinity) for a hazard ratio says a value between 0 and 10 is as plausible as one between 1000 and 1010, which is unrealistic. Ignorance about a parameter is also not the same as ignorance about a function of it, such as its logarithm, so different flat priors can be obtained on different scales.',
      source: '§16.4.1',
    },
    {
      id: 'ch16-f05',
      front: 'Distinguish a highest probability density (HPD) interval from a credible interval.',
      back: 'A HPD interval contains the values of theta with the highest posterior density, so it is the shortest interval with the required coverage, but it must usually be found numerically. An equal-tailed credible interval uses the lower and upper alpha/2 points of the posterior distribution, so it is easier to obtain; the two need not coincide for a skewed posterior.',
      source: '§16.5.2',
    },
    {
      id: 'ch16-f06',
      front: 'How does the interpretation of a Bayesian probability interval differ from that of a confidence interval?',
      back: 'A confidence interval states that there is a prescribed probability that the random interval contains the fixed true parameter value. A Bayesian interval states that the random variable theta has a given probability of lying in the interval. Bayesian intervals come directly from the posterior density, need no standard error, and are exact rather than relying on large samples.',
      source: '§16.5.2',
    },
    {
      id: 'ch16-f07',
      front: 'How is a Bayesian hypothesis test carried out?',
      back: 'By computing the posterior probability that theta lies in a specified range directly, for example P(theta > theta_0) is the integral of the posterior density from theta_0 to infinity, or P(lambda < 0.01) for a rate parameter. There is no separate null and alternative hypothesis; the posterior gives the probability that the hypothesis is true.',
      source: '§16.5.3',
    },
    {
      id: 'ch16-f08',
      front: 'Describe rejection sampling.',
      back: 'Sample a value theta_s from a convenient base density f(theta | t), scaled by K so that K f never falls below the posterior. Accept theta_s with probability pi(theta_s | t) / {K f(theta_s | t)}, otherwise reject it, using a further uniform random number. Because the acceptance ratio only involves the product of likelihood and prior, the method works when the posterior is known only up to a constant.',
      source: '§16.6.1',
    },
    {
      id: 'ch16-f09',
      front: 'What is MCMC and why is it needed?',
      back: 'Markov Chain Monte Carlo simulates values from the posterior distribution of a vector of parameters by repeatedly sampling each parameter from its conditional posterior given the most recent values of the others. The sequence of sampled values forms a Markov chain whose distribution converges to the posterior, so it works when the posterior cannot be obtained in closed form and the required multiple integration is impossible.',
      source: '§16.6.2',
    },
    {
      id: 'ch16-f10',
      front: 'What is the Bayes factor and how are its values interpreted?',
      back: 'B = P(D | M1) / P(D | M2), the ratio of the marginal probabilities of the data under two models, which summarises the weight of evidence for model 1 over model 2. Conventionally, B between 1 and 3 is weak evidence, 3 to 20 reasonable evidence, 20 to 150 strong evidence, and above 150 overwhelming evidence. A Bayes factor requires the marginal probabilities of the data and so cannot be computed when an improper prior is used.',
      source: '§16.8',
    },
    {
      id: 'ch16-f11',
      front: 'Define the DIC and say how it is used.',
      back: 'DIC = D(theta-bar) + 2 p_D, where D(theta) = -2 log L(t | theta), theta-bar is the vector of posterior means and p_D = E{D(theta)} - D(theta-bar) estimates the effective number of parameters. It combines a measure of fit with a penalty for complexity, and models with smaller DIC are preferred. With MCMC samples, E{D(theta)} is estimated by the mean deviance over the simulated values.',
      source: '§16.8.1',
    },
    {
      id: 'ch16-f12',
      front: 'What limitation of the DIC leads to the WAIC?',
      back: 'The DIC can change value when the model is reparameterised (for example between proportional hazards and accelerated failure time representations of the same Weibull model) and its measure of complexity p_D can be negative. The WAIC averages the likelihood over the posterior rather than plugging in the posterior mean, which avoids these problems.',
      source: '§16.8.2',
    },
    {
      id: 'ch16-f13',
      front: 'Summarise the main advantages and disadvantages of the Bayesian approach.',
      back: 'Advantages: prior information from earlier studies or expert opinion can be combined with the data in a unified framework, complex realistic models can be fitted, inference does not rely on large samples, and credible intervals and hypothesis tests have a direct probability interpretation. Disadvantages: a prior distribution must be specified for every unknown parameter, which is subjective, and obtaining the posterior is usually computationally intensive, requiring MCMC with attention to convergence.',
      source: '§16.9',
    },
  ],
  questions: [
    {
      id: 'ch16-q01',
      prompt: 'Which expression describes the posterior density in Bayesian inference?',
      options: [
        'The prior density divided by the likelihood.',
        'The likelihood multiplied by the prior density, divided by the marginal distribution of the data.',
        'The maximised likelihood divided by the number of parameters.',
        'The cumulative distribution function of the data.',
      ],
      correctIndex: 1,
      explanation:
        'pi(theta | t) = L(t | theta) pi(theta) / p(t). The denominator is a normalising constant, which is why the posterior is often used in the proportional form: posterior is proportional to likelihood times prior.',
      source: '§16.2',
    },
    {
      id: 'ch16-q02',
      prompt: 'When a non-informative prior is used, what drives the resulting inference?',
      options: [
        'The prior, because it has a large variance.',
        'Almost entirely the data, because the posterior is dominated by the likelihood.',
        'The number of MCMC iterations only.',
        'The choice of base density in rejection sampling.',
      ],
      correctIndex: 1,
      explanation:
        'A non-informative or vague prior contributes essentially a constant, so the posterior is proportional to the likelihood and inferences coincide closely with those from a classical analysis.',
      source: '§16.4.1',
    },
    {
      id: 'ch16-q03',
      prompt: 'A 95% Bayesian credible interval for a hazard ratio is (1.2, 2.8). How is this interpreted?',
      options: [
        'There is a 95% probability that the true hazard ratio lies in this interval, given the data.',
        'Ninety-five per cent of future studies would produce a hazard ratio in this interval.',
        'The interval would contain the true value in 95% of repeated samples.',
        'The hazard ratio is significantly different from 1 at the 5% level in a frequentist sense.',
      ],
      correctIndex: 0,
      explanation:
        'A credible interval is a direct probability statement about the parameter given the data: the probability that the hazard ratio lies inside the interval is 0.95. This is the much more natural interpretation that the Bayesian approach offers, and it does not rely on repeated sampling.',
      source: '§16.5.2',
    },
    {
      id: 'ch16-q04',
      prompt: 'How does a HPD interval differ from an equal-tailed credible interval?',
      options: [
        'They are always identical.',
        'The HPD interval contains the values of highest posterior density, while the credible interval takes equal tail probabilities; for a skewed posterior they differ.',
        'The HPD interval is only defined for discrete parameters.',
        'The HPD interval always has a smaller probability coverage.',
      ],
      correctIndex: 1,
      explanation:
        'Both have the same coverage, but the HPD interval is the shortest such interval because it cuts off low-density regions, while the equal-tailed interval simply takes alpha/2 in each tail. They coincide for a symmetric posterior.',
      source: '§16.5.2',
    },
    {
      id: 'ch16-q05',
      prompt: 'A Bayes factor of 25 is obtained in favour of Model 1 over Model 2. What does this indicate?',
      options: [
        'Weak evidence for Model 1.',
        'Reasonable evidence for Model 1, since values between 20 and 150 represent strong evidence.',
        'Overwhelming evidence for Model 1, since the value exceeds 1.',
        'That the models cannot be compared.',
      ],
      correctIndex: 1,
      explanation:
        'The conventional scale treats values of 1 to 3 as weak evidence, 3 to 20 as reasonable, 20 to 150 as strong, and above 150 as overwhelming. A value of 25 therefore gives strong evidence, and note that a Bayes factor cannot be calculated with an improper prior.',
      source: '§16.8',
    },
    {
      id: 'ch16-q06',
      prompt: 'Which statement about MCMC and rejection sampling is correct?',
      options: [
        'Both require the normalising constant of the posterior to be known.',
        'Rejection sampling works with a posterior known only up to a constant, and MCMC extends simulation to a vector of parameters by sampling from conditional posteriors.',
        'MCMC gives exact independent samples from the posterior.',
        'Rejection sampling can only be applied to discrete parameters.',
      ],
      correctIndex: 1,
      explanation:
        'The acceptance ratio in rejection sampling involves only the product of likelihood and prior, so the normalising constant is unnecessary. MCMC builds on this by repeatedly updating each parameter from its conditional posterior, producing correlated dependent samples from the joint posterior.',
      source: '§16.6.1, §16.6.2',
    },
  ],
}
