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
        <Grid.Column fluid>
          <ValueLabels />
        </Grid.Column>
        <Grid.Column fluid>
          <ValueLabels />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

function ValueLabels() {
  return (
    <Grid>
      <Grid.Row columns={4}>
        <Grid.Column>
          <Label size="tiny">
            <Icon name="circle" size="mini" color="green" /> 1
          </Label>
        </Grid.Column>
        <Grid.Column>
          <Label size="tiny">
            <Icon name="circle" size="mini" color="green" /> 1
          </Label>
        </Grid.Column>
        <Grid.Column>
          <Label size="tiny">
            <Icon name="circle" size="mini" color="green" /> 1
          </Label>
        </Grid.Column>
        <Grid.Column>
          <Label size="tiny">
            <Icon name="circle" size="mini" color="green" /> 1
          </Label>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

function SimpleTable() {
  const arr_nums = [1, 2, 3, 4];
  const arr_cols = ["green", "blue", "red", "yellow"];
  return (
    <Table basic compact singleLine unstackable>
      <Table.Body>
        <Table.Row>
          {arr_nums.map((v, idx) => {
            return <Table.Cell>{v}</Table.Cell>;
          })}
        </Table.Row>
        <Table.Row>
          {arr_cols.map((v, idx) => {
            return (
              <Table.Cell>
                <Icon name="circle" size="small" color={v} />
              </Table.Cell>
            );
          })}
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

function ManageOffers() {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>Hi there :)</Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column>
          <SimpleTable />
        </Grid.Column>
        <Grid.Column>
          <SimpleTable />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default ManageOffers;
