// tslint:disable:no-console
import { User, SDK } from "../../../src";

describe("examples of crud using foundation interface", () => {

    test("crud a user", async () => {
        const sdk = new SDK();
        // an example: create_an_entity
        const newUser: User = {
            email: "javascript.sdk.user@arm.com",
        };
        await sdk.foundation().userRepository().create(newUser);
        // end of example

        // an example: read_an_entity
        const userOne = await sdk.foundation().userRepository().read(newUser.id);
        console.log(`User email address: ${userOne.email}`);
        // end of example

        // an example: update_an_entity
        const userTwo = await sdk.foundation().userRepository().read(newUser.id);
        userTwo.fullName = "Javascript SDK User";
        await sdk.foundation().userRepository().update(userTwo, userTwo.id);
        // end of example

        // an example: delete_an_entity
        const userThree = await sdk.foundation().userRepository().read(newUser.id);
        await sdk.foundation().userRepository().delete(userThree.id);
        // end of example
    });

    test("paginator", () => {
        const sdk = new SDK();

        // an example: list_entities
        const paginator = sdk
            .foundation()
            .userRepository()
            .list({
                maxResults: 10,
                pageSize: 5,
                order: "ASC",
                include: "total_count",
            });
        paginator.executeForAll(user => console.log(`${user.fullName} (${user.id}): ${user.email}`));
        console.log(`Total count: ${paginator.totalCount}`);
        // end of example
    });

    test("paginator with a filter", () => {
        const sdk = new SDK();

        // an example: list_entities_with_filters
        const paginator = sdk
            .foundation()
            .userRepository()
            .list({
                filter: {
                    email: "javascript.sdk.user@arm.com",
                    status: {
                        in: [
                            "ACTIVE",
                            "ENROLLING",
                        ]
                    }
                },
            });
        paginator.executeForAll(user => console.log(`${user.fullName} (${user.id}): ${user.email}`));
        console.log(`Total count: ${paginator.totalCount}`);
        // end of example
    });

    test("paginator - first entity in list", async () => {
        const sdk = new SDK();

        // an example: read_first_entity_in_list
        const firstUserInList = await sdk
            .foundation()
            .userRepository()
            .list()
            .first();

        console.log(`User email address: ${firstUserInList.email}`);
        // end of example
    });

});
