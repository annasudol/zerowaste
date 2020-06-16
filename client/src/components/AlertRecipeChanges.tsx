// import * as React from 'react';
// import { useSubscription } from '@apollo/react-hooks';
// import gql from 'graphql-tag';

// const GET_USER_SUBSCRIPTION = gql`
//   subscription changesInRecipe {
//     changesInRecipe {
//     id
//     title
//     ingredients
//   }
//   }
// `;


// export const AlertRecipeChanges: React.FC = (): React.ReactElement | null => {
//   const { data } = useSubscription(GET_USER_SUBSCRIPTION);

//   if (data) {
//     console.log(data, "hello")
//   }
//   return null
// }