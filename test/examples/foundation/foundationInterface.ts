// tslint:disable:no-console
import { User, SDK } from "../../../src";

describe("examples of the foundation interface", () => {
    test("create an entity", () => {
        const sdk = new SDK();
        // an example: create_an_entity
        (async () => {
            const newUser: User = {
                email: "javascript.sdk.user@arm.com",
            };
            await sdk
                .foundation()
                .userRepository()
                .create(newUser);
            // end of example

            // an example: read_an_entity
            const userOne = await sdk
                .foundation()
                .userRepository()
                .read(newUser.id);
            console.log(`User email address: ${userOne.email}`);
            // end of example

            // an example: update_an_entity
            const userTwo = await sdk
                .foundation()
                .userRepository()
                .read(newUser.id);
            userTwo.fullName = "Javascript SDK User";
            await sdk
                .foundation()
                .userRepository()
                .update(userTwo, userTwo.id);
            // end of example

            // an example: delete_an_entity
            const userThree = await sdk
                .foundation()
                .userRepository()
                .read(newUser.id);
            await sdk
                .foundation()
                .userRepository()
                .delete(userThree.id);
        })();
        // end of example
    });

    test("list entities", () => {
        const sdk = new SDK();

        // an example: list_entities
        (async () => {
            const paginator = sdk
                .foundation()
                .userRepository()
                .list({
                    maxResults: 10,
                    pageSize: 5,
                    order: "ASC",
                    include: "total_count",
                });

            for await (const user of paginator) {
                console.log(`${user.fullName} (${user.id}): ${user.email}`);
            }

            console.log(`Total count: ${paginator.totalCount}`);
        })();
        // end of example
    });

    test("list entities with filters", () => {
        const sdk = new SDK();

        // an example: list_entities_with_filters
        (async () => {
            const paginator = sdk
                .foundation()
                .userRepository()
                .list({
                    filter: {
                        email: "javascript.sdk.user@arm.com",
                        status: {
                            in: ["ACTIVE", "ENROLLING"],
                        },
                    },
                });

            for await (const user of paginator) {
                console.log(`${user.fullName} (${user.id}): ${user.email}`);
            }

            console.log(`Total count: ${paginator.totalCount}`);
        })();
        // end of example
    });

    test("read first entity in list", () => {
        const sdk = new SDK();

        // an example: read_first_entity_in_list
        (async () => {
            const firstUserInList = await sdk
                .foundation()
                .userRepository()
                .list()
                .first();

            console.log(`User email address: ${firstUserInList.email}`);
        })();
        // end of example
    });
});
