import React from "react";
import { Table, Icon } from "semantic-ui-react";

function CurrentScore({ itemValues, itemInventory, items }) {
  return (
    <Table unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>
            <Icon name="circle" color={items[0]} />
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Icon name="circle" color={items[1]} />
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Icon name="circle" color={items[2]} />
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Icon name="circle" color={items[3]} />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>Items</Table.Cell>
          <Table.Cell>{itemInventory[0]}</Table.Cell>
          <Table.Cell>{itemInventory[1]}</Table.Cell>
          <Table.Cell>{itemInventory[2]}</Table.Cell>
          <Table.Cell>{itemInventory[3]}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Values</Table.Cell>
          <Table.Cell>{itemValues[0]}</Table.Cell>
          <Table.Cell>{itemValues[1]}</Table.Cell>
          <Table.Cell>{itemValues[2]}</Table.Cell>
          <Table.Cell>{itemValues[3]}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Score</Table.Cell>
          <Table.Cell>{itemValues[0] * itemInventory[0]}</Table.Cell>
          <Table.Cell>{itemValues[1] * itemInventory[1]}</Table.Cell>
          <Table.Cell>{itemValues[2] * itemInventory[2]}</Table.Cell>
          <Table.Cell>{itemValues[3] * itemInventory[3]}</Table.Cell>
          {/* <Table.Cell>
            {itemValues[0] * itemInventory[0] +
              itemValues[1] * itemInventory[1] +
              itemValues[2] * itemInventory[2] +
              itemValues[3] * itemInventory[3]}
          </Table.Cell> */}
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

export default CurrentScore;
