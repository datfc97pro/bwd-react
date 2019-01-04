import { Component } from "react";

class EditableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      value: undefined,
      originValue: undefined
    };
  }

  componentDidMount() {
    this.setOriginValue();
  }

  componentDidUpdate(prevProps, prevState) {
    const { errors, entityField, resetErrors } = this.props;
    if (errors && errors.length > 0 && errors[0].title === entityField) {
      this.setOriginValue();
      resetErrors();
    }
  }

  setOriginValue() {
    const { entity, entityField } = this.props;
    this.setState({
      value: entity[entityField],
      originValue: entity[entityField],
      isActive: false
    });
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  disableEdit() {
    this.setState({
      isActive: false,
      value: this.state.originValue
    });
  }

  enableEdit() {
    this.setState({
      isActive: true
    });
  }

  onKeyPress(e) {
    if (e.key === "Enter") {
      this.update();
    }
  }

  update() {
    const { updateEntity, entityField } = this.props;
    const { value, originValue } = this.state;

    if (value !== originValue) {
      updateEntity({ [entityField]: value });
      this.setState({ isActive: false, originValue: value });
    }
  }
}

export default EditableComponent;
