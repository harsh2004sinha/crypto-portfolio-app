import { Container, Title, Text, Button } from '@mantine/core';
import classes from './css/HeroImageRight.module.css';
import { Meteors } from "@/components/ui/meteors";

export function HeroImageRight() {
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Track Your{' '}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: 'pink', to: 'yellow' }}
              >
                Cryptocurrency
              </Text>{' '}
              Portfolio in Real-Time
            </Title>

            <Text className={classes.description} mt={30} c={'cyan'}>
            Get live updates, detailed analytics, and personalized insights to manage your crypto investments effortlessly.
            </Text>

          </div>
          <Meteors number={100}/>
        </div>
      </Container>
    </div>
  );
}