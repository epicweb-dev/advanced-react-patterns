# Resetting via Key Prop

The key prop is a special prop that can be used to reset the state of a
component. When the key prop changes, the component is unmounted and remounted.
This can be a useful way to reset the state of a component in some cases.

In this case, by changing the key prop, we successfully reset the state, but we
also lose the animation because we're not just changing the state of the
component, we're also creating a brand new DOM element to represent the switch.
So probably better to use the state initializer pattern.
