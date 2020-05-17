import React from "react";
import { Grid, Icon, Table, Button } from "semantic-ui-react";

function IncomingOffer({
  ask,
  asker,
  bid,
  bidder,
  offerId,
  handleAccept,
  handleDecline,
}) {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={7}>
          <BidTable bid={bid} bidder={bidder} />
        </Grid.Column>
        <Grid.Column width={2} textAlign={"center"} verticalAlign={"middle"}>
          <Icon size="large" name="arrow right" />
        </Grid.Column>
        <Grid.Column width={7}>
          <AskTable ask={ask} asker={asker} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column>
          <Button fluid onClick={() => handleAccept(offerId)}>
            Accept
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Button fluid onClick={() => handleDecline(offerId)}>
            Reject
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

function AskTable({ asker, ask }) {
  return (
    <Table size={"small"} basic compact={"very"} singleLine unstackable>
      <Table.Header>
        <Table.HeaderCell colSpan="4" textAlign={"right"}>
          {asker}
        </Table.HeaderCell>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          {Object.keys(ask).map((key, idx) => {
            return (
              <Table.Cell key={idx}>
                <Icon name="circle" size="small" color={key} />
              </Table.Cell>
            );
          })}
        </Table.Row>
        <Table.Row>
          {Object.keys(ask).map((key, idx) => {
            return (
              <Table.Cell textAlign="center" key={idx}>
                {ask[key]}
              </Table.Cell>
            );
          })}
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

function BidTable({ bidder, bid }) {
  return (
    <Table size={"small"} basic compact={"very"} singleLine unstackable>
      <Table.Header>
        <Table.HeaderCell colSpan="4" testAlign={"left"}>
          {bidder}
        </Table.HeaderCell>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          {Object.keys(bid).map((key, idx) => {
            return (
              <Table.Cell key={idx}>
                <Icon name="circle" size="small" color={key} />
              </Table.Cell>
            );
          })}
        </Table.Row>
        <Table.Row>
          {Object.keys(bid).map((key, idx) => {
            return (
              <Table.Cell textAlign="center" key={idx}>
                {bid[key]}
              </Table.Cell>
            );
          })}
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

export default IncomingOffer;
