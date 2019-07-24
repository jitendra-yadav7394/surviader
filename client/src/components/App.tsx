import * as React from 'react';
import axios from 'axios';
import { Card, Col, Row, Table, Divider, Select, Spin } from 'antd';
import { VictoryPie } from 'victory';
import '../assets/scss/App.scss';

export default class App extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      data: [],
      error: null,
      variables: {
        sex: '',
        relationship: '',
        race: ''
      }
    };
  }

  query = `query allAdults($sex: String, $race: String, $relationship: String) {
    allAdults(first: 100, sex_Icontains: $sex, race_Icontains: $race, relationship_Icontains: $relationship) {
      edges{
        node{
          id,
          age,
          work,
          fnlwgt,
          education,
          educationNum,
          maritalStatus,
          occupation,
          relationship,
          race,
          sex,
          capitalGain,
          capitalLoss,
          hoursPerWeek,
          nativeCountry,
          salary,
        }
      }
    }
  }`;

  componentDidMount() {
    this.getData(
      this.query,
      {},
    );
  }

  getData = async (query, variables) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/graphql/', {
        query,
        variables
      });
      this.setState(() => ({
        isLoaded: true,
        data: response.data.data.allAdults.edges
      }));
    } catch (error) {
      this.setState(() => ({ error }));
    }
  }

  onChange = (value, name) => {

    const variables = { ...this.state.variables };
    variables[name] = value;
    this.setState({variables, isLoaded: false});
    this.getData(this.query, {
      ...this.state.variables
    });
  }

  columns = [
    {
      title: 'Age',
      dataIndex: 'node.age',
      key: 'age',
    },
    {
      title: 'Work',
      dataIndex: 'node.work',
      key: 'work',
    },
    {
      title: 'Fnlwgt',
      dataIndex: 'node.fnlwgt',
      key: 'fnlwgt',
    },
    {
      title: 'Education',
      dataIndex: 'node.education',
      key: 'education',
    },
    {
      title: 'Education Num',
      dataIndex: 'node.educationNum',
      key: 'educationNum',
    },
    {
      title: 'Marital Status',
      dataIndex: 'node.maritalStatus',
      key: 'maritalStatus',
    },
    {
      title: 'Occupation',
      dataIndex: 'node.occupation',
      key: 'occupation',
    },
    {
      title: 'Relationship',
      dataIndex: 'node.relationship',
      key: 'relationship',
    },
    {
      title: 'Race',
      dataIndex: 'node.race',
      key: 'race',
    },
    {
      title: 'Sex',
      dataIndex: 'node.sex',
      key: 'sex',
    },
    {
      title: 'Capital Gain',
      dataIndex: 'node.capitalGain',
      key: 'capitalGain',
    },
    {
      title: 'Capital Loss',
      dataIndex: 'node.capitalLoss',
      key: 'capitalLoss',
    },
    {
      title: 'Hours PerWeek',
      dataIndex: 'node.hoursPerWeek',
      key: 'hoursPerWeek',
    },
    {
      title: 'Native Country',
      dataIndex: 'node.nativeCountry',
      key: 'nativeCountry',
    },
    {
      title: 'Salary',
      dataIndex: 'node.salary',
      key: 'salary',
    },

  ];

  render() {
    if (!this.state.isLoaded) {
      return <div style={{textAlign: 'center', margin: '200px'}}>
        <Spin size='large'/>
      </div>;
    }
    const data = this.state.data;
    const { Option } = Select;
    let dict = {
      males: 0,
      females: 0,
    };

    let relationShipDict = {};
    data.forEach(el => {
      if (el.node.sex === ' Male') {
        dict['males'] += 1;
      }
      if (el.node.sex === ' Female') {
        dict['females'] += 1;
      }

      if (relationShipDict[el.node.relationship]) {
        relationShipDict[el.node.relationship] += 1;
      } else {
        relationShipDict[el.node.relationship] = 1;
      }
    });

    const malePer = dict['males'] * 100 / (dict['males'] + dict['females']);
    const femalePer = 100 - malePer;

    let relationShipPerDict = {};
    let totalRelationShip = 0;

    for (let key in relationShipDict) {
      totalRelationShip += relationShipDict[key];
    }

    for (let key in relationShipDict) {
      relationShipPerDict[key] = relationShipDict[key] * 100 / totalRelationShip;
    }


    return (
      <Card title={'Adult Data Graph'}>
        <Row>
          <Col span={12} style={{ height: '300px', width: '300px' }}>
            <h4>Male & Female Distributions</h4>
            <VictoryPie
              colorScale={['tomato', 'orange']}
              data={[
                { x: 1, y: malePer, label: 'Male' },
                { x: 2, y: femalePer, label: 'Female' },
              ]}
            />
          </Col>
          <Col span={12} style={{ height: '300px', width: '300px', float: 'right' }}>
            <h4>Relationship Distributions</h4>
            <VictoryPie
              colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy', 'red']}
              data={[
                { x: 1, y: relationShipPerDict[' Own-child'], label: 'Own-child' },
                { x: 2, y: relationShipPerDict[' Not-in-family'], label: 'Not-in-family' },
                { x: 3, y: relationShipPerDict[' Husband'], label: 'Husband' },
                { x: 4, y: relationShipPerDict[' Other-relative'], label: 'Other-relative' },
                { x: 5, y: relationShipPerDict[' Wife'], label: 'Wife' },
                { x: 6, y: relationShipPerDict[' Unmarried'], label: 'Unmarried' },
              ]}
            />
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={8}>
            <h4>Filter With Sex</h4>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder='Select sex'
              optionFilterProp='children'
              onChange={e => this.onChange(e, 'sex')}
            >
              <Option value=''>------</Option>
              <Option value=' Male'>Male</Option>
              <Option value=' Female'>Female</Option>
            </Select>
          </Col>
          <Col span={8}>
            <h4>Filter With Race</h4>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder='Select Race'
              optionFilterProp='children'
              onChange={e => this.onChange(e, 'race')}
            >
              <Option value=''>-----</Option>
              <Option value=' White'>White</Option>
              <Option value=' Black'>Black</Option>
              <Option value=' Asian-Pac-Islander'>Asian-Pac-Islander</Option>
              <Option value=' Other'>Other</Option>
            </Select>
          </Col>
          <Col span={8}>
            <h4>Filter With Relationship</h4>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder='Select Relationship'
              optionFilterProp='children'
              onChange={e => this.onChange(e, 'relationship')}
            >
              <Option value=''>------</Option>
              <Option value=' Own-child'>Lucy</Option>
              <Option value=' Husband'>Husband</Option>
              <Option value=' Not-in-family'>Not-in-family</Option>
              <Option value=' Wife'>Wife</Option>
              <Option value=' Other-relative'>Other-relative</Option>
              <Option value=' Unmarried'>Unmarried</Option>
            </Select>
          </Col>
        </Row>
        <Table dataSource={data} columns={this.columns} />
      </Card>
    );
  }
}

interface State {
  data: any;
  isLoaded: boolean;
  error: any;
  variables: {
    sex: string;
    race: string;
    relationship: string;
  };
}

interface Props {

}
