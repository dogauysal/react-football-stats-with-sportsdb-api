import axios from 'axios';
import sidebarlist from './sidebar_menu.json';
import leaguecodes from './league_codes.json';


export default class StatsService {

    static getSidebarMenuList = async () => {
        return sidebarlist ? sidebarlist :[];
    }


    static getMenus = async() => {
        const Leagues = leaguecodes ? leaguecodes :[];
        const menuList = [];

        if(Leagues) {
            for (let i = 0; i < Leagues.length; i++) {
                const league = Leagues[i];

                const newMenu = {'id': league.league_id, 'title': league.league_title, 'season': league.league_season_id };
                
                menuList.push(newMenu);
            }
        }

        return menuList;
    }

    static getAllLeagues = async () => {
        return leaguecodes ? leaguecodes :[];
    }

    static getLeagueById = async (league_key) => {
        return leaguecodes.filter(x=> x.league_id === league_key)[0];
    }
    static getStandingByLeagueId = async (league_key,season_key) => {
        const standing = axios.create({
                baseURL: `https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=${league_key}&s=${season_key}`
            }).get();
        return standing;
    }
    
    static getFixturesByLeague = async (league_key,round_key,season_key) => {
        const fixtures = axios.create({
            baseURL: `https://www.thesportsdb.com/api/v1/json/1/eventsround.php?id=${league_key}&r=${round_key}&s=${season_key}`
        }).get();
        return fixtures;
    }
}