import { Config } from "./configeration"

import firebase from 'firebase/app'
import 'firebase/auth'

import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";

// To get JEST to shut up
import fetch from 'cross-fetch';

import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    ApolloLink,
} from '@apollo/client'

// Initialize Firebase
firebase.initializeApp(Config.Firebase);

// Setup server uri
const httpLink = new HttpLink({
    uri: `http://${Config.Server.address}:${Config.Server.port}/graphql`,
    fetch
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        console.log('graphQLErrors', graphQLErrors);
    }
    if (networkError) {
        console.log('networkError', networkError);
    }
});

const withToken = setContext(async () => {
    // Get firebase token and return it
    const token = await firebase.auth().currentUser!.getIdToken(true).then(token => {
        return token;
    });

    return { token }
})

const authMiddleware = new ApolloLink((operation, forward) => {
    // Receive async token and add it to our header
    const { token } = operation.getContext();
    operation.setContext(() => ({
        headers: {
            "mediq-auth-token": token ? token : '',
        }
    }));
    return forward(operation);
});

// Complete finishing up the client
const link = ApolloLink.from([withToken, errorLink, authMiddleware.concat(httpLink)]);

export const client = new ApolloClient({
    link,
    cache: new InMemoryCache({
        addTypename: true
    })
});
