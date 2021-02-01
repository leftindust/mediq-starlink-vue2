import {AbstractCollectionComponent} from "@/engine/components/abstract/AbstractCollectionComponent";
import {Client} from "@/engine/GqlClient";
import gql from "graphql-tag";
import {LazyController} from "@/engine/LazyController";

export type Patient = {
    pid: number;
    firstName: string;
    lastName: string;
}

export class PatientsComponent extends AbstractCollectionComponent<Patient> {
    constructor(controller: LazyController | null) {
        super("Patients", controller);
    }

    private client = new Client()

    async populateCollection(amount: number): Promise<Patient[]> {
        const query = gql`{
            patients(from: 0, to: ${amount}, sortedBy: PID) {
                pid
                firstName
                lastName
            }
        }
        `
        const result = await this.client.makeRequest(query)
        return result.data
    }

}