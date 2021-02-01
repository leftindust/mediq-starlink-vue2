import {DocumentNode, print} from "graphql";
import {Config} from "@/configeration";
import firebase from "firebase";

export class Client {
    private url = `http://${Config.Server.address}:${Config.Server.port}/graphql`

    async makeRequest(query: DocumentNode): Promise<{ data: any }> {
        const fetched = await fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'mediq-auth-token': `${await firebase.auth().currentUser?.getIdToken()}`
            },
            body: JSON.stringify({query: print(query)})
        });
        return fetched.json()
    }
}