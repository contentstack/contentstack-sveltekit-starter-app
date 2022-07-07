<script lang="ts">
  import type { FooterModel } from 'src/model/footer.model';

  import { getFooterRes } from '../helper/index';
  let footerData: FooterModel;
  const getFooterData = async () => {
    let result = await getFooterRes();
    return result;
  };
  $: getFooterData().then((val) => (footerData = val));
</script>

<footer>
  <div class="max-width footer-div">
    <div class="col-quarter">
      {#if footerData && footerData.logo}
        <a class="logo-tag" href="/">
          <img
            src={footerData.logo.url}
            alt={footerData.title}
            title={footerData.title}
            {...footerData.logo.$?.url}
            class="logo footer-logo"
          />
        </a>
      {/if}
    </div>
    <div class="col-half">
      <nav>
        <ul class="nav-ul">
          {#if footerData}
            {#each footerData.navigation.link as menu}
              <li class="footer-nav-li" key={menu.title} {...menu.$?.title}>
                <a href={menu.href}>{menu.title}</a>
              </li>
            {/each}
          {/if}
        </ul>
      </nav>
    </div>
    <div class="col-quarter social-link">
      <div class="social-nav">
        {#if footerData}
          {#each footerData.social?.social_share as social}
            <a href={social.link.href} title={social.link.title}>
              {#if social.icon}
                <img src={social.icon.url} alt={social.link.title} {...social.icon.$?.url} />
              {/if}
            </a>
          {/each}
        {/if}
      </div>
    </div>
  </div>
  {#if footerData && typeof footerData.copyright === 'string'}
    <div class="copyright" {...footerData.$?.copyright}>
      {@html footerData.copyright}
    </div>
  {/if}
</footer>
