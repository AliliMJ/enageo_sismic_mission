const now = new Date();

const today = new Date();
today.setHours(0, 0, 0, 0);

const thisWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - now.getDay(),
    0,
    0,
    0,
    0
);
const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
const thisYear = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);

export { today, thisWeek, thisMonth, thisYear };
