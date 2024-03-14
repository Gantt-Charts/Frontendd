export const getAllCharts = (state) => state.charts.charts;
export const getChartById = (state, id) => state.charts.charts.find((chart) => chart.id === id);
