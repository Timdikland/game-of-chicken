import React from "react";
import { Grid, Icon, Label, Table } from "semantic-ui-react";

function TradeRow(props) {
  const vals_give = [1, 22, 3, 4];
  const vals_take = [5, 16, 77, 8];
  return (
    <Grid>
      <Grid.Row columns={2}>
        <Grid.Column>Giver</Grid.Column>
        <Grid.Column>Taker</Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column>
          <TableValues />
        </Grid.Column>
        <Grid.Column>
          <ValueLabels />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

function ValueLabels() {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Label size="tiny">
            <Icon name="circle" size="tiny" color="green" /> 1
          </Label>
        </Grid.Column>
        <Grid.Column>
          <Label size="tiny">
            <Icon name="circle" size="tiny" color="green" /> 1
          </Label>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Label size="tiny">
            <Icon name="circle" size="tiny" color="green" /> 1
          </Label>
        </Grid.Column>
        <Grid.Column>
          <Label size="tiny">
            <Icon name="circle" size="tiny" color="green" /> 1
          </Label>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

function TableValues() {
  return (
    <Table basic="very">
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Label size="tiny">
              <Icon name="circle" size="tiny" color="green" /> 1
            </Label>
          </Table.Cell>
          <Table.Cell>
            <Label size="tiny">
              <Icon name="circle" size="tiny" color="green" /> 1
            </Label>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Label size="tiny">
              <Icon name="circle" size="tiny" color="green" /> 1
            </Label>
          </Table.Cell>
          <Table.Cell>
            <Label size="tiny">
              <Icon name="circle" size="tiny" color="green" /> 1
            </Label>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

function ManageOffers() {
  return (
    <Grid container center>
      <Grid.Row>
        <Grid.Column>Hi there :)</Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <TableValues />
      </Grid.Row>
    </Grid>
  );
}

export default ManageOffers;
