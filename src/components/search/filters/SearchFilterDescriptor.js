import SearchFilterRadio from "./SearchFilterRadio";
import SearchFilterSlider from "./SearchFilterSlider";

class SearchFilterDescriptor {
  constructor(params) {
    const { react_component, ...settings } = params;
    this.react_component = react_component;
    this.settings = settings;
  }

  static radio_filter(title, values) {
    const params = {
      react_component: SearchFilterRadio,
      title: title,
      values: values,
    };
    return new SearchFilterDescriptor(params);
  }

  static slider_filter(title, min, max) {
    const params = {
      react_component: SearchFilterSlider,
      title: title,
      min: min,
      max: max,
    };
    return new SearchFilterDescriptor(params);
  }
}

export default SearchFilterDescriptor;
