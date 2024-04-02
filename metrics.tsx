import type { BehavioralMetricsProvider, Logger, MetricsProvider } from '@shopbop/card-framework';
import type { ApiClient } from '@shopbop/api-client';

export const linkAccountsBtnReftag = 'SB_CI_LWA_ALS'; // ALS = account linking start
export const loadLinkedPageReftag = 'SB_CI_LWA_ALC'; // ALC = account linking complete
export const clickFAQReftag = 'SB_CI_LWA_FAQ';

export const emitEvents = (
  apiClient: ApiClient,
  behavioralMetricsProvider: BehavioralMetricsProvider,
  logger: Logger,
  metricsProvider: MetricsProvider,
  refTag: string,
  iNameValue: string,
) => {
  behavioralMetricsProvider.trackEvent('Login Interaction', { iName: iNameValue });
  apiClient
    .recordAmazonClickStreamEvent({
      hitType: 'PAGE_TOUCH',
      subPageType: 'CI',
      refTag,
    })
    .catch((error) => {
      const errorMessage = `Failed to emit event to clickstream for: ${refTag}; Error occurred: ${error}`;
      logger.error(errorMessage);
      metricsProvider.emitCount(refTag, 'clickstreamSendFailure', 1);
    });
};

export class BusinessMetricsUtils {
  constructor(
    public apiClient: ApiClient,
    public behavioralMetricsProvider: BehavioralMetricsProvider,
    public logger: Logger,
    public metricsProvider: MetricsProvider,
  ) {
    this.apiClient = apiClient;
    this.behavioralMetricsProvider = behavioralMetricsProvider;
    this.logger = logger;
    this.metricsProvider = metricsProvider;
  }

  public emitBusinessMetricEvents = (refTag: string, iNameValue: string) => {
    emitEvents(
      this.apiClient,
      this.behavioralMetricsProvider,
      this.logger,
      this.metricsProvider,
      refTag,
      iNameValue,
    );
  };
}
