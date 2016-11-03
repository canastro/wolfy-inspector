import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import '!style!css!sass!./index.scss';

import { getStatistics } from '../../actions/statistics-actions';
import { getOrders, getOpenPositions } from '../../actions/order-actions';
import { getSentimentReport } from '../../actions/sentiment-actions';
import { getPrices } from '../../actions/price-actions';
import { getNetworkOutputs } from '../../actions/network-output-actions';

import StatisticsContainer from '../statistics';
import PriceContainer from '../price';
import SentimentContainer from '../sentiment';
import OrdersContainer from '../orders';
import PositionsContainer from '../positions';
import NetworkOutputContainer from '../network-output';

class StockContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.props.getOrders(props.params.symbol);
        this.props.getOpenPositions(props.params.symbol);
        this.props.getSentimentReport(props.params.symbol);
        this.props.getPrices(props.params.symbol);
        this.props.getStatistics(props.params.symbol);
        this.props.getNetworkOutputs(props.params.symbol);
    }

    componentWillReceiveProps(newProps) {
        this.props.getOrders(newProps.params.symbol);
        this.props.getOpenPositions(newProps.params.symbol);
        this.props.getSentimentReport(newProps.params.symbol);
        this.props.getPrices(newProps.params.symbol);
        this.props.getStatistics(newProps.params.symbol);
        this.props.getNetworkOutputs(newProps.params.symbol);
    }

    render() {
        const symbol = this.props.params.symbol;

        return (
            <section className="app-content-wrapper stock-container">
                <StatisticsContainer symbol={symbol} />
                <PriceContainer symbol={symbol} />
                <SentimentContainer symbol={symbol} />
                <NetworkOutputContainer />

                <div className="stock-dashboard-row">
                    <OrdersContainer symbol={symbol} />
                    <PositionsContainer symbol={symbol} />
                </div>
            </section>
        );
    }
}

StockContainer.propTypes = {
    getPrices: PropTypes.func.isRequired,
    getOpenPositions: PropTypes.func.isRequired,
    getOrders: PropTypes.func.isRequired,
    getSentimentReport: PropTypes.func.isRequired,
    getStatistics: PropTypes.func.isRequired,
    getNetworkOutputs: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
};

export default connect(() => ({}), {
    getOrders,
    getOpenPositions,
    getPrices,
    getSentimentReport,
    getStatistics,
    getNetworkOutputs
})(StockContainer);
