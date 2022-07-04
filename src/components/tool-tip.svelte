<script lang="ts">
  export let content: any;
  export let direction: any;
  let toolTipRef: any;
  let timeout: any;

  const showTip = () => {
    timeout = setTimeout(() => {
      if (toolTipRef) {
        toolTipRef.style.display = 'block';
      }
    }, 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    if (toolTipRef) toolTipRef.style.display = 'none';
  };
</script>

<div class="Tooltip-Wrapper" on:mouseenter={showTip} on:mouseleave={hideTip}>
  <slot />
  <div class={`Tooltip-Tip ${direction || 'top'}`} bind:this={toolTipRef}>
    {content}
  </div>
</div>
