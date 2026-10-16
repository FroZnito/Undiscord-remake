import type { ButtonHTMLAttributes, ComponentChildren } from 'preact';
import { useState } from 'preact/hooks';
import { initials } from '../format';
import { Icon, type IconName } from './Icon';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'danger' | 'ghost';
  small?: boolean;
  icon?: IconName;
  disabled?: boolean;
};

export function Button({ variant, small, icon, children, class: cls, ...rest }: ButtonProps) {
  const classes = ['btn', variant, small && 'sm', !children && icon && 'icon-only', cls].filter(Boolean).join(' ');
  return (
    <button type="button" class={classes} {...rest}>
      {icon && <Icon name={icon} size={small ? 'sm' : undefined} />}
      {children}
    </button>
  );
}

export interface SegOption<T extends string> {
  value: T;
  label: ComponentChildren;
  icon?: IconName;
  title?: string;
}

export function Segmented<T extends string>(props: {
  value: T;
  options: SegOption<T>[];
  onChange: (v: T) => void;
  full?: boolean;
  label?: string;
}) {
  return (
    <div class={`seg${props.full ? ' full' : ''}`} role="radiogroup" aria-label={props.label}>
      {props.options.map(o => (
        <button
          type="button"
          role="radio"
          aria-checked={o.value === props.value}
          class={o.value === props.value ? 'on' : ''}
          title={o.title}
          onClick={() => props.onChange(o.value)}
        >
          {o.icon && <Icon name={o.icon} size="sm" />}
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Chip(props: { on: boolean; negative?: boolean; onClick: () => void; children: ComponentChildren; icon?: IconName }) {
  return (
    <button
      type="button"
      class={`chip${props.on ? ' on' : ''}${props.negative ? ' neg' : ''}`}
      aria-pressed={props.on}
      onClick={props.onClick}
    >
      {props.on ? <Icon name={props.negative ? 'x' : 'check'} size="sm" /> : props.icon && <Icon name={props.icon} size="sm" />}
      {props.children}
    </button>
  );
}

export function Switch(props: { checked: boolean; onChange: (v: boolean) => void; label: ComponentChildren; desc?: ComponentChildren }) {
  return (
    <label class={`switch${props.checked ? ' on' : ''}`}>
      <input type="checkbox" checked={props.checked} onChange={e => props.onChange(e.currentTarget.checked)} />
      <span class="track" />
      <span class="text">
        <b>{props.label}</b>
        {props.desc && <span class="hint">{props.desc}</span>}
      </span>
    </label>
  );
}

export function Field(props: { label: ComponentChildren; hint?: ComponentChildren; error?: string | null; children: ComponentChildren }) {
  return (
    <div class="field">
      <label>{props.label}</label>
      {props.children}
      {props.error ? <span class="hint error">{props.error}</span> : props.hint && <span class="hint">{props.hint}</span>}
    </div>
  );
}

export function Section(props: {
  title: ComponentChildren;
  children: ComponentChildren;
  open?: boolean;
  onToggle?: () => void;
  aside?: ComponentChildren;
}) {
  const collapsible = props.onToggle !== undefined;
  const open = props.open ?? true;
  return (
    <section class="section">
      <div class="section-head">
        {collapsible ? (
          <button type="button" class={`toggle${open ? '' : ' closed'}`} onClick={props.onToggle} aria-expanded={open}>
            <Icon name="chevronDown" size="sm" />
            <h3>{props.title}</h3>
          </button>
        ) : (
          <h3>{props.title}</h3>
        )}
        <div class="spacer" />
        {props.aside}
      </div>
      {open && props.children}
    </section>
  );
}

export function Avatar(props: { url?: string | null; name: string; square?: boolean; size?: 'sm' | 'lg'; icon?: IconName }) {
  const [broken, setBroken] = useState(false);
  const cls = `avatar priv${props.square ? ' square' : ''}${props.size ? ` ${props.size}` : ''}`;
  return (
    <span class={cls} aria-hidden="true">
      {props.url && !broken ? (
        <img src={props.url} alt="" loading="lazy" referrerpolicy="no-referrer" onError={() => setBroken(true)} />
      ) : props.icon ? (
        <Icon name={props.icon} size="sm" />
      ) : (
        initials(props.name)
      )}
    </span>
  );
}

export function Progress(props: { value: number | null; tone?: 'danger'; paused?: boolean; small?: boolean }) {
  const indeterminate = props.value === null;
  const cls = ['progress', props.tone, indeterminate && 'indeterminate', props.paused && 'paused', props.small && 'sm']
    .filter(Boolean).join(' ');
  return (
    <div class={cls} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={props.value ?? undefined}>
      <i style={{ width: `${Math.max(0, Math.min(100, props.value ?? 0))}%` }} />
    </div>
  );
}

export function Stat(props: { label: string; value: ComponentChildren; tone?: 'success' | 'danger' }) {
  return (
    <div class={`stat${props.tone ? ` ${props.tone}` : ''}`}>
      <span>{props.label}</span>
      <b>{props.value}</b>
    </div>
  );
}

export function Banner(props: { tone: 'warn' | 'info' | 'danger'; icon?: IconName; title?: ComponentChildren; children?: ComponentChildren; actions?: ComponentChildren }) {
  return (
    <div class={`banner ${props.tone}`} role={props.tone === 'info' ? 'status' : 'alert'}>
      <Icon name={props.icon ?? (props.tone === 'info' ? 'info' : 'alert')} />
      <div>
        {props.title && <b>{props.title}</b>}
        {props.children && <div class="hint">{props.children}</div>}
      </div>
      {props.actions && <div class="row">{props.actions}</div>}
    </div>
  );
}

export function Empty(props: { icon: IconName; children: ComponentChildren }) {
  return (
    <div class="empty">
      <Icon name={props.icon} />
      <div>{props.children}</div>
    </div>
  );
}

export function RangeField(props: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; unit?: string }) {
  return (
    <Field label={props.label}>
      <div class="range">
        <input
          type="range"
          min={props.min}
          max={props.max}
          step={props.step}
          value={props.value}
          onInput={e => props.onChange(Number(e.currentTarget.value))}
          aria-label={props.label}
        />
        <output>{props.value}{props.unit ?? ' ms'}</output>
      </div>
    </Field>
  );
}
