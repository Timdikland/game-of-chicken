import React, { useContext } from "react";
import { Table, Icon, Grid } from "semantic-ui-react";

import { ITEMS } from "../../constants/gameItems";

import { GameContext } from "../../context/game";

function CurrentScore() {
  const game = useContext(GameContext);
  const itemValues = game.values;
  const itemInventory = game.items;

  return !!itemValues && !!itemInventory ? (
    <Grid style={{ height: "20vh" }}>
      <Grid.Row>
        <Grid.Column>
          <ScoreTable itemValues={itemValues} itemInventory={itemInventory} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  ) : (
    <Grid style={{ height: "20vh" }}>
      <Grid.Row>
        <Grid.Column></Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

function ScoreTable({ itemValues, itemInventory }) {
  return (
    <Table unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>
            <Icon name="circle" color={ITEMS[0]} />
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Icon name="circle" color={ITEMS[1]} />
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Icon name="circle" color={ITEMS[2]} />
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Icon name="circle" color={ITEMS[3]} />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>Values</Table.Cell>
          <Table.Cell>{itemValues[ITEMS[0]]}</Table.Cell>
          <Table.Cell>{itemValues[ITEMS[1]]}</Table.Cell>
          <Table.Cell>{itemValues[ITEMS[2]]}</Table.Cell>
          <Table.Cell>{itemValues[ITEMS[3]]}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Items</Table.Cell>
          <Table.Cell>{itemInventory[ITEMS[0]]}</Table.Cell>
          <Table.Cell>{itemInventory[ITEMS[1]]}</Table.Cell>
          <Table.Cell>{itemInventory[ITEMS[2]]}</Table.Cell>
          <Table.Cell>{itemInventory[ITEMS[3]]}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

export default CurrentScore;
