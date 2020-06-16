import * as React from 'react';
import { gql, SubscribeToMoreOptions } from "apollo-boost";

const GET_USER_SUBSCRIPTION = gql`
  subscription changesInRecipe{
    changesInRecipe {
        id
        title
        image
        ingredients
    }
  }
`;

interface Props {
    subscribeToMore: <TSubscriptionData = any, TSubscriptionVariables = Record<string, any>>(options: SubscribeToMoreOptions<any, TSubscriptionVariables, TSubscriptionData>) => () => void
    recipes: any
}

export const Recipes: React.FC<Props> = ({ subscribeToMore, recipes }) => {

    const subscribeToMoreMessage = () => {

        subscribeToMore({
            document: GET_USER_SUBSCRIPTION,
            updateQuery: (previousResult, { subscriptionData }) => {
                console.log("hey", subscriptionData)

                if (!subscriptionData.data) {
                    return previousResult;
                }
                console.log(subscriptionData, "subscriptionData")

                const { messageCreated } = subscriptionData.data;

                return {
                    ...previousResult,
                    // messages: {
                    //     ...previousResult.messages,
                    //     edges: [
                    //         messageCreated.message,
                    //         ...previousResult.messages.edges,
                    //     ],
                    // },
                };
            },
        });
    };

    React.useEffect(() => {

        subscribeToMoreMessage();
    }, [subscribeToMore]);

    return (<div className='main'>

    </div>)
}