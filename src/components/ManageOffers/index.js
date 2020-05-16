import React from "react";
import { Grid, Icon, Table } from "semantic-ui-react";

function SimpleTable() {
  const arr_nums = [1, 2, 3, 4];
  const arr_cols = ["green", "blue", "red", "yellow"];
  return (
    <Table size={"small"} basic compact={"very"} singleLine unstackable>
      <Table.Header>
        <Table.HeaderCell colSpan="4">Giver</Table.HeaderCell>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          {arr_nums.map((v, idx) => {
            return <Table.Cell textAlign="center">{v}</Table.Cell>;
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
  const offers = [
    {
      ask: [0, 0, 0, 1],
      asker: "Tim",
      bid: [0, 1, 0, 0],
      bidder: "Max",
    },
  ];

  const items = ["red", "yellow", "green", "blue"];
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={7}>
          <SimpleTable />
        </Grid.Column>
        <Grid.Column width={2} textAlign={"center"} verticalAlign={"middle"}>
          <Icon size="large" name="arrow right" />
        </Grid.Column>
        <Grid.Column width={7}>
          <SimpleTable />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default ManageOffers;
