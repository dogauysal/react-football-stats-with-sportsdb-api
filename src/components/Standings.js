import React from 'react';

class Standings extends React.Component {

    render() {
        return(
            <table className="ui very basic collapsing celled table">
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Club</th>
                        <th>Played</th>
                        <th>Won</th>
                        <th>Draw</th>
                        <th>Lost</th>
                        <th>GF</th>
                        <th>GA</th>
                        <th>GD</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.LeagueTable.map((team,index) => {
                            return (
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{team.name}</td>
                                    <td>{team.played}</td>
                                    <td>{team.win}</td>
                                    <td>{team.draw}</td>
                                    <td>{team.loss}</td>
                                    <td>{team.goalsfor}</td>
                                    <td>{team.goalsagainst}</td>
                                    <td>{team.goalsdifference}</td>
                                    <td>{team.total}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        )
    }
}

export default Standings;