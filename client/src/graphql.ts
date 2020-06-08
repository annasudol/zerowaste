import gql from 'graphql-tag';
import client from './client';

const NEW_USER_SUBSCRIPTION = gql`
  subscription {
    userCreated {
        name
        email
    }
  }
`;

const messagesAddedSubscription = gql`
  subscription {
    messageAdded {
    id
    text
  }
  }
`;

export function onMessageAdded(handleMessage) {
    const observable = client.subscribe({ query: messagesAddedSubscription });
    observable.subscribe(({ data }) => handleMessage(data.messageAdded));
}


export function onUserAdded(handleMessage) {
    const observable = client.subscribe({ query: NEW_USER_SUBSCRIPTION });
    observable.subscribe(({ data }) => console.log(data));
}
