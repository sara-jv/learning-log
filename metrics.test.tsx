import type { ClickStreamAmazonLogMetricRequest } from '@shopbop/api-models';
import type { ApiClient } from '@shopbop/api-client';
import {
  mockBehavioralMetricsProvider,
  mockLogger,
  mockMetricsProvider,
} from '../testUtils';
import { emitEvents } from '../../src/utils/metrics';

describe('metrics tests', () => {
  const refTag = 'testRefTag';
  const iNameValue = 'testINameValue';
  const testApiClient = {
    recordAmazonClickStreamEvent: jest
      .fn<Promise<void>, [ClickStreamAmazonLogMetricRequest]>()
      .mockResolvedValue(Promise.resolve()),
  } as unknown as ApiClient;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('emitEvents should emit clickstream and adobe metrics', async () => {
    emitEvents(
      testApiClient,
      mockBehavioralMetricsProvider,
      mockLogger,
      mockMetricsProvider,
      refTag,
      iNameValue,
    );
    // Assert behavioralMetricsProvider.trackEvent was called
    expect(mockBehavioralMetricsProvider.trackEvent).toHaveBeenCalledWith('Login Interaction', { iName: iNameValue });

    // Assert apiClient.recordAmazonClickStreamEvent was called
    expect(testApiClient.recordAmazonClickStreamEvent).toHaveBeenCalledWith({
      hitType: 'PAGE_TOUCH',
      subPageType: 'CI',
      refTag,
    });
    // nothing should be logged
    expect(mockLogger.error).not.toHaveBeenCalled();
  });

  it('emitEvents should handle errors', async () => {
    const errorMock = new Error('Test error');
    (testApiClient.recordAmazonClickStreamEvent as jest.Mock).mockRejectedValueOnce(errorMock);

    emitEvents(
      testApiClient,
      mockBehavioralMetricsProvider,
      mockLogger,
      mockMetricsProvider,
      refTag,
      iNameValue,
    );
    expect(mockBehavioralMetricsProvider.trackEvent).toHaveBeenCalledWith('Login Interaction', { iName: iNameValue });
    expect(testApiClient.recordAmazonClickStreamEvent).toHaveBeenCalledWith({
      hitType: 'PAGE_TOUCH',
      subPageType: 'CI',
      refTag,
    });
    // Assert logger.error was called with the expected error message
    expect(mockLogger.error).toHaveBeenCalledWith(`Failed to emit event to clickstream for: ${refTag}; Error occurred: ${errorMock}`);
    // Assert metricsProvider.emitCount was called with the expected parameters
    expect(mockMetricsProvider.emitCount).toHaveBeenCalledWith(refTag, 'clickstreamSendFailure', 1);
  });
});
