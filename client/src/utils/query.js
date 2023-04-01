export const reduce = (QuerySnapshots) => {
    console.log(QuerySnapshots.getValues());
    return QuerySnapshots.reduce((collection, snapshot) => {
        if (snapshot.exists()) collection[snapshot.key] = snapshot.val();
        return collection;
    }, {});
};
