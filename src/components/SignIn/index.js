import React from "react";
import { Form, Grid, Header, Segment, Button } from "semantic-ui-react";

const SignIn = () => {
  return (
    <Grid
      container
      textAlign="center"
      style={{ height: "100vh" }}
      verticalAlign="middle"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center">
          Enter your name
        </Header>
        <Form onSubmit={(e, d) => console.log(e, d)}>
          <Segment>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Tradebot beeb boop"
            />
            <Button color="teal" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default SignIn;
