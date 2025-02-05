import React, { FC } from 'react';
import { Box, Flex, Text } from '@blockstack/ui';
import { ExternalLink } from '@components/external-link';
import { useHistory } from 'react-router-dom';

import routes from '@constants/routes.json';
import { useBackButton } from '@hooks/use-back-url';
import { useSelector } from 'react-redux';
import { selectMeetsMinStackingThreshold, selectPoxInfo } from '@store/stacking';
import { RootState } from '@store/index';
import { toHumanReadableStx } from '@utils/unit-convert';
import { useBalance } from '@hooks/use-balance';
import {
  StartStackingLayout as Layout,
  StackingOptionsCardContainer as CardContainer,
  StackingOptionCard as Card,
  StackingOptionCardTitle as Title,
  StackingOptionCardButton as OptionButton,
  StackingOptionCardAdvantage as OptionBenefit,
  InsufficientStackingBalanceWarning,
} from './components/start-stacking-layout';
import { ExplainerTooltip } from '@components/tooltip';

export const ChooseStackingMethod: FC = () => {
  const history = useHistory();
  useBackButton(routes.HOME);

  const { availableBalance } = useBalance();

  const { meetsMinThreshold, poxInfo } = useSelector((state: RootState) => ({
    meetsMinThreshold: selectMeetsMinStackingThreshold(state),
    poxInfo: selectPoxInfo(state),
  }));

  const sufficientBalanceToCoverFee = availableBalance.isGreaterThan(260);

  return (
    <Layout>
      <Text textStyle="display.large" fontSize="32px" mt="tight" display="block" textAlign="center">
        Start Stacking
      </Text>
      <Text mt="base" color="ink.600" maxWidth="480px">
        Lock your STX to support the network. As a reward, you’ll have the chance to earn BTC that
        miners transfer as part of Proof-of-Transfer (PoX).
      </Text>
      <ExternalLink
        href="https://www.stacks.co/stacking-and-stx"
        fontWeight="normal"
        mt="base-tight"
        color="blue"
      >
        Learn more about Stacking
      </ExternalLink>

      <CardContainer>
        <Card>
          <Title>Stack on your own</Title>
          <OptionBenefit>Lock your STX with the PoX contract directly</OptionBenefit>
          <OptionBenefit>
            Minimum required to stack is{' '}
            {toHumanReadableStx(poxInfo?.paddedMinimumStackingAmountMicroStx || 0)}
          </OptionBenefit>
          <OptionBenefit>Choose a set number of cycles</OptionBenefit>
          <Flex alignItems="center">
            <OptionButton
              onClick={() => history.push(routes.STACKING)}
              isDisabled={!meetsMinThreshold}
            >
              Continue
            </OptionButton>
            {!meetsMinThreshold && <InsufficientStackingBalanceWarning />}
          </Flex>
        </Card>

        <Card ml={[null, null, 'loose']} mt={['loose', null, 'unset']}>
          <Title>Stack with others</Title>
          <OptionBenefit>Delegate to a pool that will lock your STX with others</OptionBenefit>
          <Flex flexDirection="row" alignItems="center">
            <OptionBenefit>No minimum required by the protocol</OptionBenefit>
            <Box ml="extra-tight" mt="tight">
              <ExplainerTooltip>
                Your chosen pool may set their own minimum amount to participate
              </ExplainerTooltip>
            </Box>
          </Flex>
          <OptionBenefit>Choose an indefinite or limited number of cycles</OptionBenefit>
          <Flex alignItems="center">
            <OptionButton
              onClick={() => history.push(routes.DELEGATED_STACKING)}
              isDisabled={!sufficientBalanceToCoverFee}
            >
              Continue
            </OptionButton>
            {!sufficientBalanceToCoverFee && <InsufficientStackingBalanceWarning />}
          </Flex>
        </Card>
      </CardContainer>
    </Layout>
  );
};
