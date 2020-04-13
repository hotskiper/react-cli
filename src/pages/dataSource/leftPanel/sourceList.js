import React from 'react';
import styled from 'styled-components';

const SourceListWrap = styled.div`
  /* padding: 16px 0; */
`;

const SourceItem = styled.div`
  position: relative;
  padding: 8px 16px;
  font-size: 14px;
  color: #5a5e66;
  cursor: pointer;

  .icon-item {
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAOCAYAAAAbvf3sAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjUyRjAzNkUyNzRBODExRUE5QTVBRjlGOUVBQTc3NjZCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjUyRjAzNkUzNzRBODExRUE5QTVBRjlGOUVBQTc3NjZCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTJGMDM2RTA3NEE4MTFFQTlBNUFGOUY5RUFBNzc2NkIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTJGMDM2RTE3NEE4MTFFQTlBNUFGOUY5RUFBNzc2NkIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/y1qBAAAAxUlEQVR42mJkQAJb9pwJBVLGQOwCFdoDxGd9XExWw9QwQhWuAlKhDPjBaqDGMEag4t1IJhICe5iAhBID8UAJpGE1CRpWgzTcA2JXKI0LwNWwAIlyIJ4F9JAyNACMkVUCxc9CxUHq0kCePgMNSngwQjEDVBw5mM+CbOgE4plALAiVwBVi70FqQX5wAVorBKQroCa/R8MgsXSoGheQk95BJSqQYxRLCugAuYIFagLIGauAErAQeQ9VK4gWT3tITxqkJj6AAAMAQgVLQXyFFTwAAAAASUVORK5CYII=')
      center center no-repeat;
    display: inline-block;
    width: 12px;
    height: 14px;
    vertical-align: middle;
    margin-right: 4px;
  }

  &.active,
  &:hover {
    background: #e9f3fe;
    .icon-item {
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAOCAYAAAAbvf3sAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQ2MUZBRTRDNzRBRTExRUE5OThCQ0FDNUNGOUY4QkQ3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQ2MUZBRTRENzRBRTExRUE5OThCQ0FDNUNGOUY4QkQ3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDYxRkFFNEE3NEFFMTFFQTk5OEJDQUM1Q0Y5RjhCRDciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDYxRkFFNEI3NEFFMTFFQTk5OEJDQUM1Q0Y5RjhCRDciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz54jwgAAAAAv0lEQVR42mJkQAKard9DgZQxELtAhfYA8dnr1ZyrYWoYoQpXAalQBvxgNVBjGCNQ8W4kEwmBPUxAQomBeKAE0rCaBA2rQRruAbErlMYF4GpYgEQ5EM8CekgZGgDGyCqB4meh4iB1aSBPn4EGJTwYoZgBKo4czGdBNnQC8UwgFoRK4Aqx9yC1ID+4AK0VAtIVUJPfo2GQWDpUjQvISe+gEhXIMYolBXSAXIEt4u5BDWCAOhM5nvaQnjRITXwAAQYA299JVESH2SkAAAAASUVORK5CYII=');
    }
  }
`;

class SourceList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  handleClick = index => {
    this.props.onChange(index);
  };
  
  render() {
    const sourceList = this.props.data;
    return (
      <SourceListWrap>
        {sourceList.map((source, index) => {
          return (
            <SourceItem className={source.id === this.props.activeId ? 'ellipsis active' : 'ellipsis'} key={source.id} onClick={this.handleClick.bind(this, index)}>
              <span className="icon-item"></span>
              <span>{source.connName}</span>
            </SourceItem>
          );
        })}
      </SourceListWrap>
    );
  }
}

export default SourceList;
