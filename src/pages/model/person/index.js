import React from 'react';
import Text from '../../../components/text';
import Table from '../../../components/table';
import Json from './person.json';

class AiPerson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 1
    }
  }
  render() {
    console.log('Json', Json);
    return (
      <div className="ai-person">
        {/* <Text name="111" /> */}
        <Table data={Json.data} desc={Json.desc} _key='ai_person' />
      </div>
    )
  }
}

export default AiPerson;