import * as React from 'react';
import { useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';


const NEW_USER_SUBSCRIPTION = gql`
  subscription userCreated {
    userCreated {
        name
        email
    }
}
`;

export const AlertNewUser: React.FunctionComponent = (): React.ReactElement => {
  const { data, loading } = useSubscription(NEW_USER_SUBSCRIPTION);
  console.log(data, 'data')
  return <div>hello</div>
}