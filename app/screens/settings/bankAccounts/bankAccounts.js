import React, {Component} from 'react'
import {View, ListView, StyleSheet, RefreshControl, TouchableHighlight, Text} from 'react-native'
import Account from './../../../components/bankAccount'
import SettingsService from './../../../services/settingsService'
import Colors from './../../../config/colors'
import Header from './../../../components/header'

export default class BankAccounts extends Component {
    static navigationOptions = {
        title: 'Bank accounts',
    }

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2),
            }),
        }
    }

    componentWillMount() {
        this.getData()
    }

    goToEdit = (reference) => {
        this.props.navigation.navigate("EditBankAccount", {reference})
    }

    getData = async () => {
        this.setState({
            refreshing: true,
        })
        let responseJson = await SettingsService.getAllBankAccounts()
        if (responseJson.status === "success") {
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2)});
            const data = responseJson.data
            let ids = data.map((obj, index) => index);
            this.setState({
                refreshing: false,
                dataSource: ds.cloneWithRows(data, ids),
            })
        }
        else {
            this.props.logout()
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    navigation={this.props.navigation}
                    back
                    title="Bank accounts"
                />
                <ListView
                    refreshControl={<RefreshControl refreshing={this.state.refreshing}
                                                    onRefresh={this.getData.bind(this)}/>}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <Account onPress={this.goToEdit} reference={rowData}
                                                     name={rowData.bank_name}/>}
                />
                <TouchableHighlight
                    style={styles.submit}
                    onPress={() => this.props.navigation.navigate("AddBankAccount", {
                        parentRoute: 'Settings',
                        nextRoute: 'SettingsBankAccounts'
                    })}>
                    <Text style={{color: 'white', fontSize: 20}}>
                        Add bank account
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    submit: {
        marginBottom: 10,
        marginHorizontal: 20,
        borderRadius: 25,
        height: 50,
        backgroundColor: Colors.mediumbrown,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
