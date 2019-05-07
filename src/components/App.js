import '../css/style.css';
import React from 'react';
import HeaderMenu from './menu/HeaderMenu';
import SidebarMenu from './menu/SidebarMenu';
import StatsService from '../services/StatsService';
import LeagueDetail from './LeagueDetail';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            headerMenu: [],
            sidebarMenu:[],
            SidebarKey: 0,
            CurrentLeague: {},
            Loading: {}
        }
    }

    onSidebarClick = async (menu) => {
        this.setState({SidebarKey: menu.id})
    }

    onMenuClick = async (menu) => {
        await StatsService.getLeagueById(menu.id).then((league) => {
            this.setState({CurrentLeague: league});
            this.setState({SidebarKey: 1});
        })
    } 

    async componentDidMount() {
        await StatsService.getMenus().then((headerMenu) =>{
            this.setState({headerMenu});
        });
        await StatsService.getSidebarMenuList().then((sidebarMenu) => {
            this.setState({sidebarMenu:sidebarMenu, SidebarKey:sidebarMenu[0].id});
        });
        await StatsService.getLeagueById(this.state.headerMenu[0].id).then((league) => {
            this.setState({CurrentLeague: league});
        })
        
    }   

    render() {
        return (
            <div className="container">
                <h1>Football Stats</h1>
                <div className="content">
                    <HeaderMenu 
                        LeagueKey={this.state.CurrentLeague.league_id}
                        menus={this.state.headerMenu} 
                        onMenuClick={this.onMenuClick}
                    />
                    <div className="row">
                        <div className="col-md-3 col-sm-3">
                            <SidebarMenu 
                                menus={this.state.sidebarMenu}
                                onSidebarClick={this.onSidebarClick}
                            />
                        </div>
                        <div className="col-md-9 col-sm-9">
                            <h2>{this.state.CurrentLeague.league_title}</h2>
                            <LeagueDetail  
                                SidebarKey={this.state.SidebarKey}
                                League={this.state.CurrentLeague}
                            />
                        </div> 
                    </div>
                </div>
            </div>
        );
    }
}

export default App;