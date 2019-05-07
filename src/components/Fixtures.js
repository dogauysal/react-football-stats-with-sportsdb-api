import React from 'react';
import StatsService from '../services/StatsService';
import Spinner from './Spinner';

class Fixtures extends React.Component {

    state = {
        Fixtures: [],
        Loading: false
    }

    SelectedGameweek(gameweek) {
        var element = document.getElementById(gameweek);
        if(element) {
            var prevElements = document.getElementsByClassName("selected_gameweek");
            if(prevElements) {
                for (let i = 0; i < prevElements.length; i++) {
                    const prevElement = prevElements[i];
                    prevElement.classList.remove("selected_gameweek");
                }
            }
            element.classList.add("selected_gameweek")
        }
    }

    LoadFixture = async (gameweek) => {
        this.setState({Loading: true});
        await StatsService.getFixturesByLeague(this.props.League.league_id,gameweek,this.props.League.league_season_id).then((res) => {
            this.setState({Fixtures: res.data.events});
            this.setState({Loading: false});
            this.SelectedGameweek(gameweek);
        })
    }

    addFirstHalfGameweeks() {
        let children = [];
        for (let i = 0; i < this.props.League.number_of_gameweeks / 2; i++) {
            children.push(
                <li className="page-item">
                    <a 
                        onClick={(e) => { 
                            e.preventDefault();
                            this.LoadFixture(e.target.id);  
                        }}
                        id={i+1} 
                        className="page-link" 
                        href="/"> {i + 1}
                    </a>
                </li>)
        }
        return children;
        
    }

    addSecondHalfGameweeks() {
        let children = [];
        for (let i = this.props.League.number_of_gameweeks / 2; i < this.props.League.number_of_gameweeks; i++) {
            children.push(
                <li className="page-item">
                    <a 
                        onClick={(e) => { 
                            e.preventDefault();
                            this.LoadFixture(e.target.id);
                        }}
                        id={i+1} 
                        className="page-link" 
                        href="/"> {i + 1}
                    </a>
                </li>)
        }
        return children;
    }

    async componentDidMount() {
        this.setState({Loading:true});
        await StatsService.getFixturesByLeague(this.props.League.league_id,1,this.props.League.league_season_id).then((res) => {
            this.setState({Fixtures: res.data.events});
            this.SelectedGameweek(1);
            this.setState({Loading:false});
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.League !== this.props.League || prevProps.SidebarKey !== this.props.SidebarKey)  {
            this.LoadFixture(1);
        }
            
    }


    render() {

        if(!this.state.Loading) {
            return(
                <div>
                    <nav>
                        <ul class="pagination justify-content-center">
                            {this.addFirstHalfGameweeks()}
                        </ul>
                        <ul class="pagination justify-content-center">
                            {this.addSecondHalfGameweeks()}
                        </ul>
                    </nav>
                    <div className="fixture">
                        <ul>
                            {
                                this.state.Fixtures.map((event) => {
                                    return(
                                        
                                        <li>
                                            <div className="teams">
                                                <div className="home"><label>{event.strHomeTeam}</label></div>
                                                <div className="score">
                                                    <div className="homeScore"><label>{event.intHomeScore}</label></div>
                                                    <div className="divider">-</div>
                                                    <div className="awayScore"><label>{event.intAwayScore}</label></div>
                                                </div>
                                                <div className="away"><label>{event.strAwayTeam}</label></div>
                                            </div>
                                            <hr />
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            )
        } else {
            return <Spinner />;
        }

    }
}

export default Fixtures;