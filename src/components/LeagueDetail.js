import React from 'react';
import Standings from './Standings';
import Fixtures from './Fixtures';
import StatsService from '../services/StatsService';
import Spinner from './Spinner';

class LeagueDetail extends React.Component {

    state = {
        League: {},
        LeagueTable: [],
        Fixtures: [],
        SidebarKey: 0,
        Loading: false
    }

    getLeagueStanding() {
        this.setState({Loading: true});
        StatsService.getStandingByLeagueId(this.props.League.league_id,this.props.League.league_season_id).then((res) => {
            this.setState({LeagueTable: res.data.table});
            this.setState({Loading: false});
        })
    }

    componentDidUpdate(prevProps) {

        if(prevProps.League !== this.props.League) {
            this.getLeagueStanding();
            this.setState({League: this.props.League});
        } 

        if(prevProps.SidebarKey !== this.props.SidebarKey) {
            this.setState({SidebarKey: this.props.SidebarKey});
        }
    }

    render() {

        if(!this.state.Loading) {
            switch (this.props.SidebarKey) {
                case 1:
                    return <Standings LeagueTable={this.state.LeagueTable}  />;
                case 2:
                    return <Fixtures 
                                League={this.state.League} 
                                SidebarKey={this.state.SidebarKey} 
                                Fixtures={this.state.Fixtures}
                            />;
                default:
                    return <div>League Detail</div>;
            }
        } else {
            return <Spinner />;
        }

    }
}

export default LeagueDetail;