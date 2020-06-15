import * as React from 'react';
import { gql } from "apollo-boost";

const GET_USER_SUBSCRIPTION = gql`
  subscription changesInRecipe {

    id
    title
    ingredients

  }
`;

export const Recipes: React.FunctionComponent<{ subscribeToMore: any, recipes: any }> = ({ subscribeToMore, recipes }) => {
    const [results, setResults] = React.useState();
    const subscribeToMoreMessage = React.useCallback(() => {
        subscribeToMore({
            document: GET_USER_SUBSCRIPTION,
            updateQuery: (previousResult, { subscriptionData }) => {
                setResults(previousResult);

                if (!subscriptionData.data) {
                    return previousResult;
                }

                const { messageCreated } = subscriptionData.data;

                return {
                    ...previousResult,
                    messages: {
                        ...previousResult.messages,
                        edges: [
                            messageCreated.message,
                            ...previousResult.messages.edges,
                        ],
                    },
                };
            },
        });
    }, [subscribeToMore]);

    React.useEffect(() => {
        subscribeToMoreMessage();
    }, [subscribeToMoreMessage]);
    console.log(results, "results");
    return (<div className='main'>

    </div>)
}